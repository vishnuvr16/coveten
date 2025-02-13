import React from 'react';

interface Props {
    data: Array<{
        id: string;
        title: string;
        sampleStatus: 'ON_WAY' | 'RECEIVED' | 'NOT_SENT';
        projectHas: {
            title: string;
        };
        moduleticketFor: {
            ticket: string;
        };
    }>;
    updateModuleStatus: (id: string, status: 'ON_WAY' | 'RECEIVED' | 'NOT_SENT') => Promise<void>;
}

const SampleTable = ({ data, updateModuleStatus }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        updateModuleStatus(id, e.target.value as 'ON_WAY' | 'RECEIVED' | 'NOT_SENT');
    };

    return (
        <table className="min-w-full leading-normal uppercase">
            <thead>
                <tr className='border-b border-gray-200'>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Serial
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Project Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Module Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Ticket
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-dimText dark:text-darkDimText uppercase tracking-wider dark:bg-darkBg dark:border-darkBorder">
                        Sample Status
                    </th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((module, index) =>
                    <tr key={module.id} className='border-b border-gray-200'>
                        <td className="px-5 py-5 bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                            <p className="whitespace-no-wrap">{index + 1}</p>
                        </td>
                        <td className="px-5 py-5 bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                            <p className="whitespace-no-wrap">{module.projectHas.title?.slice(0, 20)}..</p>
                        </td>
                        <td className="px-5 py-5 bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                            <p className="whitespace-no-wrap">
                                {module.title?.slice(0, 30)}...
                            </p>
                        </td>
                        <td className="px-5 py-5 bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                            <p className="whitespace-no-wrap">
                                {module.moduleticketFor.ticket}
                            </p>
                        </td>
                        <td className="px-5 py-5 bg-white text-xs dark:bg-darkBg dark:border-darkBorder">
                            <div className="whitespace-no-wrap">
                                <div className="flex flex-row mb-1 sm:mb-0">
                                    <div className="relative">
                                        <select
                                            value={module.sampleStatus}
                                            onChange={(e) => handleChange(e, module.id)}
                                            className="h-full rounded-r block w-full bg-white border text-sm pr-8 border-gray-300 py-1 px-3 leading-tight focus:outline-none dark:bg-darkBg dark:border-darkBorder"
                                        >
                                            <option value='ON_WAY'>SENT</option>
                                            <option value='NOT_SENT'>NOT SENT</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default SampleTable;