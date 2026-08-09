import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, ArrowRight, CalendarX, Share2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { LoadingScreen } from "../components/ui/spinner";
import { Section } from "../components/ui/Section";
import { Surface } from "../components/ui/Surface";
import { Badge } from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";
import { UserProfileSEO } from "../components/SEO";
import { userApi } from "../lib/api";

export function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await userApi.getByUsername(username);
        setUser(data);
      } catch (err) {
        setError("User not found");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  if (loading) {
    return <LoadingScreen message="Loading profile..." />;
  }

  if (error || !user) {
    return (
      <Section spacing="lg">
        <div className="container-custom text-center py-20">
          <EmptyState
            icon={<CalendarX className="h-12 w-12" />}
            title="User Not Found"
            description="This user doesn't exist or hasn't set up their profile yet."
            action={
              <Link to="/">
                <Button>Go Home</Button>
              </Link>
            }
          />
        </div>
      </Section>
    );
  }

  return (
    <Section spacing="lg">
      <UserProfileSEO username={username} name={user.name} />
      <div className="container-custom max-w-3xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Surface variant="elevated" padding="lg" className="inline-block">
            <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {user.name?.charAt(0) || username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="heading-hero text-3xl md:text-4xl mb-2">{user.name}</h1>
            <p className="text-muted-foreground">@{username}</p>
          </Surface>
        </motion.div>

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="heading-section text-xl md:text-2xl mb-6">Available Events</h2>
          
          {user.events?.length === 0 ? (
            <Card variant="elevated">
              <CardContent className="py-12 text-center">
                <EmptyState
                  icon={<Calendar className="h-12 w-12" />}
                  title="No public events available"
                  description="This user hasn't created any public events yet."
                />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {user.events?.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link to={`/${username}/${event.id}`}>
                    <Card variant="interactive" className="group cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="heading-card text-lg group-hover:text-primary transition-colors mb-2">
                              {event.title}
                            </h3>
                            {event.description && (
                              <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
                                {event.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{event.duration} min</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users size={14} />
                                <span>{event._count?.bookings || 0} bookings</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="group-hover:bg-primary/10 ml-4">
                            <ArrowRight className="h-5 w-5 group-hover:text-primary transition-colors" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}