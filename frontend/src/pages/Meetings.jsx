import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Video, 
  Mail, 
  User,
  ExternalLink,
  Trash2,
  CalendarX
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog";
import { LoadingScreen, Spinner } from "../components/ui/spinner";
import { Section } from "../components/ui/Section";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";
import { dashboardApi, bookingsApi } from "../lib/api";
import { formatDate, formatTime } from "../lib/utils";
import { cn } from "../lib/utils";

export function Meetings() {
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [pastMeetings, setPastMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [meetingToCancel, setMeetingToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const [upcoming, past] = await Promise.all([
          dashboardApi.getMeetings("upcoming"),
          dashboardApi.getMeetings("past"),
        ]);

        setUpcomingMeetings(upcoming);
        setPastMeetings(past);
      } catch (err) {
        console.error("Error fetching meetings:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeetings();
  }, []);

  const handleCancelMeeting = async () => {
    if (!meetingToCancel) return;
    setCancelling(true);

    try {
      await bookingsApi.cancel(meetingToCancel.id);
      setUpcomingMeetings(upcomingMeetings.filter((m) => m.id !== meetingToCancel.id));
      setCancelDialogOpen(false);
      setMeetingToCancel(null);
    } catch (err) {
      console.error("Error cancelling meeting:", err);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading meetings..." />;
  }

  const MeetingCard = ({ meeting, isPast = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <Card variant="elevated" className={cn("hover:shadow-elevated-md transition-all", isPast && "opacity-75")}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Date/Time */}
            <div className="flex items-center gap-4 md:w-48">
              <div className="p-3 rounded-xl bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{formatDate(meeting.startTime)}</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}
                </p>
              </div>
            </div>

            {/* Event Info */}
            <div className="flex-1 min-w-0">
              <h3 className="heading-card text-lg truncate">{meeting.event?.title}</h3>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{meeting.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail size={14} />
                  <span className="truncate">{meeting.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{meeting.event?.duration} min</span>
                </div>
              </div>
              {meeting.additionalInfo && (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  Note: {meeting.additionalInfo}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {!isPast && meeting.meetLink && (
                <a
                  href={meeting.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default" size="sm" className="gap-2">
                    <Video size={16} />
                    Join Meeting
                  </Button>
                </a>
              )}
              {!isPast && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    setMeetingToCancel(meeting);
                    setCancelDialogOpen(true);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Section spacing="default">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="heading-hero text-3xl md:text-4xl mb-2">Your Meetings</h1>
          <p className="text-muted-foreground">
            View and manage all your scheduled meetings
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming" className="gap-2">
              <Calendar size={16} />
              Upcoming ({upcomingMeetings.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-2">
              <Clock size={16} />
              Past ({pastMeetings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingMeetings.length === 0 ? (
              <EmptyState
                icon={<CalendarX className="h-12 w-12" />}
                title="No upcoming meetings"
                description="When someone books a meeting with you, it will appear here."
              />
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {upcomingMeetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastMeetings.length === 0 ? (
              <EmptyState
                icon={<CalendarX className="h-12 w-12" />}
                title="No past meetings"
                description="Your past meetings will be shown here."
              />
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {pastMeetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} isPast />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Cancel Confirmation Dialog */}
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cancel Meeting</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this meeting with {meetingToCancel?.name}? 
                They will be notified of the cancellation.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                Keep Meeting
              </Button>
              <Button variant="destructive" onClick={handleCancelMeeting} disabled={cancelling}>
                {cancelling ? <Spinner size="sm" /> : "Cancel Meeting"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  );
}