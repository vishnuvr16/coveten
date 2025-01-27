"use client"
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MessageCircle, Search, Send } from 'lucide-react';

type Message = {
  text: string;
  time: string;
  fromUser: boolean;
};

type Ticket = {
  ticketId: string;
  subject: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  messages: Message[];
  created: string;
};

const SupportChat = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchTicket, setSearchTicket] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      ticketId: 'T-1001',
      subject: 'Login Issues',
      status: 'open',
      priority: 'high',
      messages: [
        { text: "I can't login to my account", time: '10:30 AM', fromUser: true },
        { text: "I'll help you with that. Can you describe what happens when you try to login?", time: '10:32 AM', fromUser: false },
      ],
      created: '2024-12-24 10:30 AM',
    },
    {
      ticketId: 'T-1002',
      subject: 'Payment Failed',
      status: 'pending',
      priority: 'medium',
      messages: [
        { text: 'My payment transaction failed', time: '11:20 AM', fromUser: true },
        { text: 'Let me check the transaction logs. Could you provide the transaction ID?', time: '11:22 AM', fromUser: false },
      ],
      created: '2024-12-24 11:20 AM',
    },
  ]);

  const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedTicket) return;

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.ticketId === selectedTicket.ticketId) {
        return {
          ...ticket,
          messages: [
            ...ticket.messages,
            {
              text: message,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              fromUser: false,
            },
          ],
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-100px)] gap-5">
      <div className="w-1/3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <div className="mb-4">
          <h2 className="mb-4 text-xl font-bold">Support Tickets</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full rounded-md border p-2 pl-8"
              value={searchTicket}
              onChange={(e) => setSearchTicket(e.target.value)}
            />
            <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <PerfectScrollbar className="h-[calc(100vh-200px)]">
          {tickets.map((ticket: Ticket) => (
            <div
              key={ticket.ticketId}
              className={`mb-2 cursor-pointer rounded-lg p-3 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 
                ${selectedTicket?.ticketId === ticket.ticketId ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{ticket.ticketId}</span>
                <span className={`h-2 w-2 rounded-full ${getPriorityColor(ticket.priority)}`}></span>
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{ticket.subject}</div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="capitalize">{ticket.status}</span>
                <span>{ticket.created}</span>
              </div>
            </div>
          ))}
        </PerfectScrollbar>
      </div>

      <div className="flex-1 p-4 bg-white rounded-lg shadow-md dark:bg-gray-900">
        {selectedTicket ? (
          <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedTicket.subject}</h3>
                <p className="text-sm text-gray-500">Ticket ID: {selectedTicket.ticketId}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${getPriorityColor(selectedTicket.priority)} text-white`}>
                {selectedTicket.priority}
              </span>
            </div>

            <PerfectScrollbar className="flex-1">
              <div className="space-y-4">
                {selectedTicket.messages.map((msg: Message, idx: number) => (
                  <div key={idx} className={`flex ${msg.fromUser ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${msg.fromUser ? 'bg-gray-100 dark:bg-gray-800' : 'bg-blue-500 text-white'}`}>
                      <p>{msg.text}</p>
                      <span className="mt-1 block text-right text-xs opacity-70">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </PerfectScrollbar>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-md border p-2"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
                onClick={sendMessage}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <MessageCircle className="mb-4 h-16 w-16" />
            <p>Select a ticket to view the conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportChat;
