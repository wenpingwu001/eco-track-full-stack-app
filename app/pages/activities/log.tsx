"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea } from "@nextui-org/react";

export default function LogActivity() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        carbonEmission: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/activity/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, userId: 1 }), // Replace with actual user ID
            });

            if (response.ok) {
                router.push("/dashboard");
            } else {
                alert("Failed to log activity");
            }
        } catch (error) {
            console.error(error);
            alert("Error logging activity");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6">
            <h1 className="mb-6 text-2xl font-bold">Log Activity</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                        Activity Name
                    </label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium"
                    >
                        Description
                    </label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label
                        htmlFor="carbonEmission"
                        className="block text-sm font-medium"
                    >
                        Carbon Emission (kg CO2)
                    </label>
                    <Input
                        type="number"
                        id="carbonEmission"
                        name="carbonEmission"
                        value={formData.carbonEmission}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    color="primary"
                >
                    Log Activity
                </Button>
            </form>
        </div>
    );
}
