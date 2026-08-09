import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, isSameDay, startOfDay } from "date-fns";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Video,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { LoadingScreen, Spinner } from "../components/ui/spinner";
import { Section } from "../components/ui/Section";
import { Surface } from "../components/ui/Surface";
import { ProgressIndicator } from "../components/ui/ProgressIndicator";
import { BookingPageSEO } from "../components/SEO";
import { eventsApi, availabilityApi, bookingsApi } from "../lib/api";
import { cn, formatTime } from "../lib/utils";

export function BookingPage() {
  const { username, eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Booking flow state
  const [step, setStep] = useState(1); // 1: Select date, 2: Select time, 3: Enter details, 4: Confirmation
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booking, setBooking] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    additionalInfo: "",
  });

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await eventsApi.getByUsernameAndId(username, eventId);
        setEvent(data);
      } catch (err) {
        setError("Event not found");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [username, eventId]);

  useEffect(() => {
    async function fetchSlots() {
      if (!selectedDate) return;
      
      setLoadingSlots(true);
      try {
        const data = await availabilityApi.getSlots(
          username,
          eventId,
          selectedDate.toISOString()
        );
        setAvailableSlots(data.slots || []);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchSlots();
  }, [selectedDate, username, eventId]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setStep(2);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep(3);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBooking(true);

    try {
      const result = await bookingsApi.create({
        eventId,
        name: formData.name,
        email: formData.email,
        additionalInfo: formData.additionalInfo,
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
      });
      setBookingResult(result);
      setStep(4);
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setBooking(false);
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const days = [];

    // Add padding for days before the first of the month
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const today = startOfDay(new Date());
    return date < today;
  };

  if (loading) {
    return <LoadingScreen message="Loading event..." />;
  }

  if (error || !event) {
    return (
      <Section spacing="lg">
        <div className="container-custom text-center py-20">
          <h1 className="heading-hero text-2xl md:text-3xl mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This event doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="lg">
      <div className="container-custom max-w-4xl">
        <BookingPageSEO 
          username={username} 
          eventId={eventId} 
          eventTitle={event.title} 
          hostName={event.user?.name} 
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back button */}
          {step > 1 && step < 4 && (
            <Button
              variant="ghost"
              className="mb-4 gap-2"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          )}

          <Card variant="elevated" className="overflow-hidden">
            <div className="grid md:grid-cols-[300px_1fr]">
              {/* Event Info Sidebar */}
              <div className="p-6 bg-muted/30 border-r">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={event.user?.imageUrl} />
                    <AvatarFallback>
                      {event.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{event.user?.name}</p>
                    <p className="text-sm text-muted-foreground">@{username}</p>
                  </div>
                </div>

                <h1 className="heading-card text-2xl mb-2">{event.title}</h1>
                {event.description && (
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} />
                  <span>{event.duration} minutes</span>
                </div>

                {selectedDate && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-primary" />
                      <span className="font-medium">
                        {format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </span>
                    </div>
                    {selectedSlot && (
                      <div className="flex items-center gap-2 text-sm mt-2">
                        <Clock size={16} className="text-primary" />
                        <span className="font-medium">
                          {formatTime(selectedSlot.start)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="p-6">
                <ProgressIndicator steps={3} currentStep={step - 1} className="mb-6" />
                
                <AnimatePresence mode="wait">
                  {/* Step 1: Select Date */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="heading-section text-lg mb-4">Select a Date</h2>
                      
                      {/* Calendar Navigation */}
                      <div className="flex items-center justify-between mb-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
                        >
                          <ChevronLeft size={20} />
                        </Button>
                        <span className="font-medium">
                          {format(currentMonth, "MMMM yyyy")}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
                        >
                          <ChevronRight size={20} />
                        </Button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {generateCalendarDays().map((date, i) => (
                          <button
                            key={i}
                            disabled={isDateDisabled(date)}
                            onClick={() => date && handleDateSelect(date)}
                            className={cn(
                              "aspect-square rounded-lg text-sm font-medium transition-all",
                              isDateDisabled(date)
                                ? "text-muted-foreground/30 cursor-not-allowed"
                                : "hover:bg-primary/10 cursor-pointer",
                              selectedDate && isSameDay(date, selectedDate) && "bg-primary text-primary-foreground"
                            )}
                          >
                            {date ? date.getDate() : ""}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Select Time */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="heading-section text-lg mb-4">Select a Time</h2>
                      
                      {loadingSlots ? (
                        <div className="flex items-center justify-center py-12">
                          <Spinner size="lg" />
                        </div>
                      ) : availableSlots.length === 0 ? (
                        <div className="text-center py-12">
                          <Clock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                          <p className="text-muted-foreground">No available slots for this date</p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => setStep(1)}
                          >
                            Choose another date
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {availableSlots.map((slot, i) => (
                            <motion.button
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => handleSlotSelect(slot)}
                              className={cn(
                                "p-4 rounded-lg border text-center transition-all hover:border-primary hover:bg-primary/5",
                                selectedSlot?.start === slot.start && "border-primary bg-primary/10"
                              )}
                            >
                              <div className="font-medium">{formatTime(slot.start)}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatTime(slot.end)}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Enter Details */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="heading-section text-lg mb-4">Your Details</h2>
                      
                      <form onSubmit={handleBooking} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            autoComplete="email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                          <Textarea
                            id="additionalInfo"
                            placeholder="Any details you'd like to share..."
                            value={formData.additionalInfo}
                            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={booking}>
                          {booking ? <Spinner size="sm" /> : "Confirm Booking"}
                        </Button>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 4: Confirmation */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-8 w-8 text-success" />
                      </div>
                      <h2 className="heading-hero text-2xl mb-2">Booking Confirmed!</h2>
                      <p className="text-muted-foreground mb-6">
                        A confirmation email has been sent to {formData.email}
                      </p>
                      
                      {bookingResult?.meetLink && (
                        <a
                          href={bookingResult.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="gap-2">
                            <Video size={16} />
                            Join Meeting
                          </Button>
                        </a>
                      )}
                      
                      <div className="mt-6 pt-6 border-t">
                        <p className="text-sm text-muted-foreground mb-2">
                          Meeting Details:
                        </p>
                        <p className="font-medium">
                          {format(selectedDate, "EEEE, MMMM d, yyyy")}
                        </p>
                        <p className="font-medium">
                          {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}