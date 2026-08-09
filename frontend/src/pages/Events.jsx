import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Clock, 
  Users, 
  Link as LinkIcon, 
  Trash2, 
  Copy,
  Check,
  Globe,
  Lock,
  ExternalLink,
  Calendar as CalendarIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { LoadingScreen, Spinner } from "../components/ui/spinner";
import { eventsApi } from "../lib/api";
import { cn } from "../lib/utils";
import { Section } from "../components/ui/Section";
import { Surface } from "../components/ui/Surface";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";

const durations = [
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 45, label: "45 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" },
];

export function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 30,
    isPrivate: true,
  });

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      setCreateDialogOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await eventsApi.getAll();
        setEvents(data.events || []);
        setUsername(data.username || "");
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newEvent = await eventsApi.create(formData);
      setEvents([newEvent, ...events]);
      setCreateDialogOpen(false);
      setFormData({ title: "", description: "", duration: 30, isPrivate: true });
    } catch (err) {
      console.error("Error creating event:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;
    setSubmitting(true);

    try {
      await eventsApi.delete(eventToDelete.id);
      setEvents(events.filter((e) => e.id !== eventToDelete.id));
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (err) {
      console.error("Error deleting event:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = (eventId) => {
    const link = `${window.location.origin}/${username}/${eventId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(eventId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return <LoadingScreen message="Loading events..." />;
  }

  return (
    <Section spacing="default">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="heading-hero text-3xl md:text-4xl mb-2">Your Events</h1>
            <p className="text-muted-foreground">
              Create and manage your event types
            </p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)} className="gap-2 shadow-elevated-md">
            <Plus size={18} />
            Create Event
          </Button>
        </motion.div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <EmptyState
              icon={<CalendarIcon className="h-12 w-12" />}
              title="No events yet"
              description="Create your first event to start accepting bookings"
              action={
                <Button onClick={() => setCreateDialogOpen(true)} className="gap-2">
                  <Plus size={18} />
                  Create Your First Event
                </Button>
              }
            />
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card variant="interactive" className="group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {event.title}
                            {event.isPrivate ? (
                              <Lock size={14} className="text-muted-foreground" />
                            ) : (
                              <Globe size={14} className="text-success" />
                            )}
                          </CardTitle>
                          <CardDescription className="mt-1 line-clamp-2">
                            {event.description || "No description"}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{event.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{event._count?.bookings || 0} bookings</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1"
                          onClick={() => copyLink(event.id)}
                        >
                          {copiedId === event.id ? (
                            <>
                              <Check size={14} className="text-success" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              Copy Link
                            </>
                          )}
                        </Button>
                        <a
                          href={`/${username}/${event.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="icon" className="gap-1">
                            <ExternalLink size={14} />
                          </Button>
                        </a>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            setEventToDelete(event);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Create Event Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Set up a new event type for people to book with you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateEvent}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., 30-minute consultation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What is this event for?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select
                  value={formData.duration.toString()}
                  onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value.toString()}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isPrivate"
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked })}
                />
                <Label htmlFor="isPrivate" className="cursor-pointer">
                  Make this event private
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? <Spinner size="sm" /> : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent} disabled={submitting}>
              {submitting ? <Spinner size="sm" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Section>
  );
}