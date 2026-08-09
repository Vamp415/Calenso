import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Save, Check, Sun, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { LoadingScreen, Spinner } from "../components/ui/spinner";
import { Section } from "../components/ui/Section";
import { Surface } from "../components/ui/Surface";
import { availabilityApi } from "../lib/api";
import { cn } from "../lib/utils";

const DAYS = [
  { key: "MONDAY", label: "Monday", short: "Mon" },
  { key: "TUESDAY", label: "Tuesday", short: "Tue" },
  { key: "WEDNESDAY", label: "Wednesday", short: "Wed" },
  { key: "THURSDAY", label: "Thursday", short: "Thu" },
  { key: "FRIDAY", label: "Friday", short: "Fri" },
  { key: "SATURDAY", label: "Saturday", short: "Sat" },
  { key: "SUNDAY", label: "Sunday", short: "Sun" },
];

const TIME_OPTIONS = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hour = h.toString().padStart(2, "0");
    const minute = m.toString().padStart(2, "0");
    TIME_OPTIONS.push(`${hour}:${minute}`);
  }
}

const TIME_GAP_OPTIONS = [
  { value: 0, label: "No gap" },
  { value: 5, label: "5 minutes" },
  { value: 10, label: "10 minutes" },
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
];

const DEFAULT_AVAILABILITY = {
  MONDAY: { enabled: true, startTime: "09:00", endTime: "17:00" },
  TUESDAY: { enabled: true, startTime: "09:00", endTime: "17:00" },
  WEDNESDAY: { enabled: true, startTime: "09:00", endTime: "17:00" },
  THURSDAY: { enabled: true, startTime: "09:00", endTime: "17:00" },
  FRIDAY: { enabled: true, startTime: "09:00", endTime: "17:00" },
  SATURDAY: { enabled: false, startTime: "09:00", endTime: "17:00" },
  SUNDAY: { enabled: false, startTime: "09:00", endTime: "17:00" },
};

export function Availability() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [timeGap, setTimeGap] = useState(15);
  const [schedule, setSchedule] = useState(DEFAULT_AVAILABILITY);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const data = await availabilityApi.get();
        
        if (data && data.days) {
          const newSchedule = { ...DEFAULT_AVAILABILITY };
          data.days.forEach((day) => {
            const startDate = new Date(day.startTime);
            const endDate = new Date(day.endTime);
            newSchedule[day.day] = {
              enabled: true,
              startTime: `${startDate.getHours().toString().padStart(2, "0")}:${startDate.getMinutes().toString().padStart(2, "0")}`,
              endTime: `${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`,
            };
          });
          // Mark days not in the response as disabled
          DAYS.forEach((d) => {
            if (!data.days.find((day) => day.day === d.key)) {
              newSchedule[d.key].enabled = false;
            }
          });
          setSchedule(newSchedule);
          setTimeGap(data.timeGap || 15);
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailability();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const days = DAYS.filter((d) => schedule[d.key].enabled).map((d) => {
        const [startHour, startMin] = schedule[d.key].startTime.split(":").map(Number);
        const [endHour, endMin] = schedule[d.key].endTime.split(":").map(Number);
        
        const startTime = new Date();
        startTime.setHours(startHour, startMin, 0, 0);
        
        const endTime = new Date();
        endTime.setHours(endHour, endMin, 0, 0);

        return {
          day: d.key,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        };
      });

      await availabilityApi.update({ timeGap, days });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving availability:", err);
    } finally {
      setSaving(false);
    }
  };

  const toggleDay = (dayKey) => {
    setSchedule({
      ...schedule,
      [dayKey]: { ...schedule[dayKey], enabled: !schedule[dayKey].enabled },
    });
  };

  const updateTime = (dayKey, field, value) => {
    setSchedule({
      ...schedule,
      [dayKey]: { ...schedule[dayKey], [field]: value },
    });
  };

  if (loading) {
    return <LoadingScreen message="Loading availability..." />;
  }

  return (
    <Section spacing="default">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="heading-hero text-3xl md:text-4xl mb-2">Availability</h1>
            <p className="text-muted-foreground">
              Set when you're available for meetings
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2 shadow-elevated-md">
            {saving ? (
              <Spinner size="sm" />
            ) : saved ? (
              <>
                <Check size={18} />
                Saved!
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>

        {/* Time Gap Setting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Surface variant="elevated" padding="md">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-primary" />
              <CardTitle className="text-lg">Buffer Time</CardTitle>
            </div>
            <CardDescription className="mb-4">
              Minimum gap between consecutive meetings
            </CardDescription>
            <Select value={timeGap.toString()} onValueChange={(v) => setTimeGap(parseInt(v))}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_GAP_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Surface>
        </motion.div>

        {/* Weekly Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Surface variant="elevated" padding="md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg">Weekly Schedule</CardTitle>
              <CardDescription>
                Configure your available hours for each day
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pt-0 space-y-4">
              {DAYS.map((day, i) => (
                <motion.div
                  key={day.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg transition-colors",
                    schedule[day.key].enabled ? "bg-muted/50" : "bg-muted/20"
                  )}
                >
                  <div className="flex items-center gap-3 sm:w-32">
                    <Checkbox
                      id={day.key}
                      checked={schedule[day.key].enabled}
                      onCheckedChange={() => toggleDay(day.key)}
                    />
                    <Label
                      htmlFor={day.key}
                      className={cn(
                        "font-medium cursor-pointer",
                        !schedule[day.key].enabled && "text-muted-foreground"
                      )}
                    >
                      {day.label}
                    </Label>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <Label htmlFor={`${day.key}-start`} className="sr-only">
                        Start Time
                      </Label>
                      <Select
                        value={schedule[day.key].startTime}
                        onValueChange={(value) => updateTime(day.key, "startTime", value)}
                        disabled={!schedule[day.key].enabled}
                      >
                        <SelectTrigger id={`${day.key}-start`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="text-muted-foreground">to</span>
                    <div className="flex-1">
                      <Label htmlFor={`${day.key}-end`} className="sr-only">
                        End Time
                      </Label>
                      <Select
                        value={schedule[day.key].endTime}
                        onValueChange={(value) => updateTime(day.key, "endTime", value)}
                        disabled={!schedule[day.key].enabled}
                      >
                        <SelectTrigger id={`${day.key}-end`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Surface>
        </motion.div>
      </div>
    </Section>
  );
}