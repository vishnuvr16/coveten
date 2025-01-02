'use client'
import React, { useEffect, useState } from 'react';

const HomepageClients = () => {
  // States
  const [clientData, setClientData] = useState<any>({
    client1: {
      id: '1',
      name: 'Client 1',
      logo: null,
    },
    client2: {
      id: '2',
      name: 'Client 2',
      logo: null,
    },
    client3: {
      id: '3',
      name: 'Client 3',
      logo: null,
    },
    client4: {
      id: '4',
      name: 'Client 4',
      logo: null,
    },
    client5: {
      id: '5',
      name: 'Client 5',
      logo: null,
    },
    client6: {
      id: '6',
      name: 'Client 6',
      logo: null,
    },
    client7: {
      id: '7',
      name: 'Client 7',
      logo: null,
    },
    client8: {
      id: '8',
      name: 'Client 8',
      logo: null,
    },
  });

  // Placeholder sample data
  const sampleClients = [
    { id: '1', name: 'Client 1', logo: null },
    { id: '2', name: 'Client 2', logo: null },
    { id: '3', name: 'Client 3', logo: null },
    { id: '4', name: 'Client 4', logo: null },
    { id: '5', name: 'Client 5', logo: null },
    { id: '6', name: 'Client 6', logo: null },
    { id: '7', name: 'Client 7', logo: null },
    { id: '8', name: 'Client 8', logo: null },
  ];

  // Setting data to state
  useEffect(() => {
    sampleClients.map((client, i) => {
      setClientData((prev: any) => ({
        ...prev,
        [`client${i + 1}`]: {
          id: client.id,
          name: client.name,
          logo: client.logo,
        },
      }));
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Updated client data:', clientData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded p-5 min-h-[70vh]">
        <h1 className='mb-4 text-3xl'>Clients</h1>
      {sampleClients.map((client, i) => (
        <div key={client.id}>
          <div className="mb-5">
            <p className="font-bold mb-4">client-{i + 1}</p>
            <label htmlFor="title" className="block text-gray-700 text-sm mb-1">
              Title
            </label>
            <input
              defaultValue={clientData[`client${i + 1}`]?.name}
              onChange={(e) =>
                setClientData((prev: any) => {
                  return {
                    ...prev,
                    [`client${i + 1}`]: {
                      ...prev[`client${i + 1}`],
                      name: e.target.value,
                    },
                  };
                })
              }
              className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="logo" className="block text-gray-700 text-sm mb-1">
              Logo
            </label>
            <input
              type="file"
              onChange={(e) =>
                setClientData((prev: any) => {
                  const file = e.target.files?.[0];
                  return {
                    ...prev,
                    [`client${i + 1}`]: {
                      ...prev[`client${i + 1}`],
                      logo: file,
                    },
                  };
                })
              }
              className="mt-1 px-4 py-2 border border-gray-200 rounded-md w-full"
            />
          </div>
        </div>
      ))}

      <div>
        <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold">
          Update
        </button>
      </div>
    </form>
  );
};

export default HomepageClients;
