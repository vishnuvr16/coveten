"use client";
import React, { useState } from 'react';
import { format } from 'date-fns';
import { EyeIcon, Trash2 } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  location: string;
  startsAt: Date;
  endsAt: Date;
  category: string;
  registrationUrl: string;
  image: string;
  description: string;
}

const ComponentsAppsEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const categories = [
    'Regional',
    'National',
    'International',
    'Service Providers',
    'Dealer & Distributions'
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent = {
      id: selectedEvent?.id || Date.now(),
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      startsAt: new Date(formData.get('startsAt') as string),
      endsAt: new Date(formData.get('endsAt') as string),
      category: formData.get('category') as string,
      registrationUrl: formData.get('registrationUrl') as string,
      image: formData.get('image') as string,
      description: formData.get('description') as string,
    };

    if (selectedEvent) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? newEvent : event
      ));
    } else {
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleView = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen panel p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Event
          </button>
        </div>

        <div className="bg-[#243656] rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#2a4166]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Starts At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ends At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {events.map((event, index) => (
                <tr key={event.id} className="hover:bg-[#2a4166]">
                  <td className="px-6 py-4 text-sm text-gray-300">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{event.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{event.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {format(event.startsAt, 'PPp')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {format(event.endsAt, 'PPp')}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => handleView(event)}
                      className="text-blue-400 hover:text-blue-300" title='view details'
                    >
                      <EyeIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-400 hover:text-red-300" title='delete'
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-[#243656] rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                {selectedEvent ? 'Edit Event' : 'Create Event'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedEvent?.name}
                    required
                    className="w-full px-3 py-2 bg-[#1b2e4b] border border-gray-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedEvent?.location}
                    required
                    className="w-full px-3 py-2 bg-[#1b2e4b] border border-gray-600 rounded text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Starts At
                    </label>
                    <input
                      type="datetime-local"
                      name="startsAt"
                      defaultValue={selectedEvent?.startsAt.toISOString().slice(0, 16)}
                      required
                      className="w-full px-3 py-2 bg-[#1b2e4b] border border-gray-600 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ends At
                    </label>
                    <input
                      type="datetime-local"
                      name="endsAt"
                      defaultValue={selectedEvent?.endsAt.toISOString().slice(0, 16)}
                      required
                      className="w-full px-3 py-2 bg-[#1b2e4b] border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={selectedEvent?.category}
                    required
                    className="w-full px-3 py-2 bg-[#1b2e4b] border border-gray-600 rounded text-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Registration URL
                  </label>
                  <input
                    type="url"
                    name="registrationUrl"
                    defaultValue={selectedEvent?.registrationUrl}
                    required
                    className="w-full px-3 py-2 bg-[#1b2e4b] border border-gray-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    defaultValue={selectedEvent?.image}
                    required
                    className="w-full px-3 py-2 bg-[#1b2e4b] border border-gray-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={selectedEvent?.description}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-[#1b2e4b] border border-gray-600 rounded text-white"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedEvent(null);
                    }}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {selectedEvent ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentsAppsEvent;