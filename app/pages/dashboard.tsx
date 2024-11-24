"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch("/api/activity/read?userId=1"); // Replace with actual user ID
                const data = await response.json();
                setActivities(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {loading
                ? <p>Loading...</p>
                : activities.length === 0
                ? <p>No activities logged yet.</p>
                : (
                    <table className="w-full table-auto bg-white shadow rounded overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-4 text-left">Activity</th>
                                <th className="p-4 text-left">Description</th>
                                <th className="p-4 text-left">
                                    Carbon Emission (kg CO2)
                                </th>
                                <th className="p-4 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map((activity) => (
                                <tr key={activity.id} className="border-t">
                                    <td className="p-4">{activity.name}</td>
                                    <td className="p-4">
                                        {activity.description}
                                    </td>
                                    <td className="p-4">
                                        {activity.carbonEmission}
                                    </td>
                                    <td className="p-4">
                                        {new Date(activity.createdAt)
                                            .toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    );
}
