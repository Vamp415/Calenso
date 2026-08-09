import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowRight,
  CalendarDays,
  Video,
  ExternalLink,
  Settings,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { LoadingScreen } from "../components/ui/spinner";
import { Section } from "../components/ui/Section";
import { Surface } from "../components/ui/Surface";
import { Badge } from "../components/ui/Badge";
import { dashboardApi } from "../lib/api";
import { formatDateTime } from "../lib/utils";

export function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch dashboard data without user authentication
        const [analyticsData, meetingsData] = await Promise.all([
          dashboardApi.getAnalytics(),
          dashboardApi.getUpdates(),
        ]);

        setAnalytics(analyticsData);
        setUpcomingMeetings(meetingsData);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen message="Loading dashboard..." />;
  }

  if (error) {
    return (
      <div className="container-custom px-4 py-12 text-center">
        <p className="text-destructive">Error: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Events",
      value: analytics?.totalEvents || 0,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+12%",
    },
    {
      title: "Total Bookings",
      value: analytics?.totalBookings || 0,
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      trend: "+8%",
    },
    {
      title: "Upcoming Meetings",
      value: analytics?.upcomingMeetings || 0,
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
      trend: "+5%",
    },
    {
      title: "This Month",
      value: analytics?.recentBookings || 0,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
      trend: "+15%",
    },
  ];

  return (
    <div className="container-custom py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="heading-hero text-3xl md:text-4xl mb-2">
          Welcome back, <span className="gradient-text">there</span>!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your schedule today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Surface variant="elevated" className="hover:shadow-elevated-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <Badge variant="success" size="sm">{stat.trend}</Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.title}</div>
                </CardContent>
              </Surface>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
              <Link to="/meetings">
                <Button variant="ghost" size="sm" className="gap-1">
                  View all <ArrowRight size={14} />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingMeetings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
                    <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No upcoming meetings</h3>
                  <p className="text-muted-foreground mb-6">Create an event to get started</p>
                  <Link to="/events">
                    <Button variant="gradient" className="gap-2">
                      <CalendarDays size={16} />
                      Create Event
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingMeetings.map((meeting, i) => (
                    <motion.div
                      key={meeting.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Video className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{meeting.event?.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDateTime(meeting.startTime)}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          with {meeting.name}
                        </p>
                      </div>
                      {meeting.meetLink && (
                        <a
                          href={meeting.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline" className="gap-1">
                            Join <ExternalLink size={12} />
                          </Button>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/events?create=true" className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-14 hover:bg-muted/50">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Create New Event</div>
                    <div className="text-xs text-muted-foreground">Set up a new event type</div>
                  </div>
                </Button>
              </Link>
              <Link to="/availability" className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-14 hover:bg-muted/50">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Update Availability</div>
                    <div className="text-xs text-muted-foreground">Set your working hours</div>
                  </div>
                </Button>
              </Link>
              <Link to="/meetings" className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-14 hover:bg-muted/50">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Users className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">View All Meetings</div>
                    <div className="text-xs text-muted-foreground">Manage your schedule</div>
                  </div>
                </Button>
              </Link>
              <Link to="/events" className="block">
                <Button variant="outline" className="w-full justify-start gap-3 h-14 hover:bg-muted/50">
                  <div className="p-2 rounded-lg bg-success/10">
                    <BarChart3 className="h-4 w-4 text-success" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Manage Events</div>
                    <div className="text-xs text-muted-foreground">Edit or delete events</div>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}