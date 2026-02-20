'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import DashboardLayout from '@/app/dashboard/layout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar as CalendarIcon } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    location: string;
    all_day: boolean;
    club: {
        id: number;
        name: string;
    } | null;
}

export default function CalendarPage() {
    const { data: events, isLoading } = useQuery<Event[]>({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await api.get('/events/');
            return res.data;
        }
    });

    // Map backend Event API responses mapping to FullCalendar structure
    const formattedEvents = events?.map(event => ({
        id: String(event.id),
        title: event.title,
        start: event.start_time,
        end: event.end_time,
        allDay: event.all_day,
        backgroundColor: event.club ? '#8b5cf6' : '#3b82f6', // Purple for Club events, Blue for individual ones
        borderColor: event.club ? '#8b5cf6' : '#3b82f6',
        extendedProps: {
            description: event.description,
            location: event.location,
            clubName: event.club?.name
        }
    })) || [];

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <CalendarIcon className="text-blue-500 w-8 h-8" />
                        Campus Calendar
                    </h1>
                    <div className="flex gap-4">
                        <span className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span> My Events
                        </span>
                        <span className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="w-3 h-3 rounded-full bg-purple-500"></span> Club Events
                        </span>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-3xl border border-gray-700/50 shadow-xl p-6">
                    <div className="fc-theme-premium">
                        {isLoading ? (
                            <div className="h-[600px] flex items-center justify-center animate-pulse">
                                <div className="text-gray-500 text-lg">Loading your calendar...</div>
                            </div>
                        ) : (
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                }}
                                events={formattedEvents}
                                height="700px"
                                navLinks={true}
                                dayMaxEvents={true}
                                eventClick={(info) => {
                                    alert(`Event: ${info.event.title}\nClub: ${info.event.extendedProps.clubName || 'None'}`);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Tailwind specific overrides for FullCalendar to match the dark theme perfectly */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .fc-theme-premium {
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: #1f2937;
          --fc-neutral-text-color: #d1d5db;
          --fc-border-color: #374151;
          
          --fc-button-text-color: #fff;
          --fc-button-bg-color: #374151;
          --fc-button-border-color: #4b5563;
          --fc-button-hover-bg-color: #4b5563;
          --fc-button-hover-border-color: #6b7280;
          --fc-button-active-bg-color: #2563eb;
          --fc-button-active-border-color: #2563eb;
          
          --fc-event-bg-color: #3b82f6;
          --fc-event-border-color: #3b82f6;
          --fc-event-text-color: #fff;
          
          --fc-today-bg-color: rgba(59, 130, 246, 0.1);
        }
        .fc .fc-toolbar-title { font-size: 1.5rem; font-weight: 700; color: #f3f4f6; }
        .fc th { padding: 12px 0; background: #111827; text-transform: uppercase; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.05em; color: #9ca3af; }
        .fc-theme-standard td, .fc-theme-standard th { border-color: #374151; }
        .fc-daygrid-day-number { color: #e5e7eb; font-weight: 500; font-size: 0.95rem; padding: 8px 12px !important; }
        .fc .fc-button { border-radius: 8px; font-weight: 600; transition: all 0.2s; text-transform: capitalize; }
        .fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active { background-color: #2563eb !important; border-color: #2563eb !important; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.4); }
        .fc-event { border-radius: 6px; padding: 2px 4px; border: none; font-size: 0.8rem; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
      `}} />
        </DashboardLayout>
    );
}
