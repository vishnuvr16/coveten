// components/defaultNavItems.tsx
import React from "react";




import { LuAppWindow, LuCalculator, LuBellRing, LuVoicemail, LuUser, LuTerminal, LuShieldCheck, LuReplaceAll, LuSchool, LuQrCode, LuHeadphones, LuCopySlash, LuClipboardCheck, LuMail } from "react-icons/lu";
// define a NavItem prop

type Links =
    {
        label: string;
        href: string;
        icon: React.ReactNode
    }



export type NavItem = {
    section: string;
    links: Links[]
};



export const defaultNavItems = [
    {
        section: "General",
        links: [
            {
                label: "Dashboard",
                href: "/user/dashboard",
                icon: <LuAppWindow className="w-6 h-6" />,
            },
            {
                label: "Notifications",
                href: "/user/dashboard/notification",
                icon: <LuBellRing className="w-6 h-6" />,
            }
        ]
    },
    {
        section: "Communication",
        links: [
            {
                label: "Internal Email",
                href: "/user/dashboard/internal_email",
                icon: <LuCopySlash className="w-6 h-6" />,
            },
            {
                label: "Chats",
                href: "/user/dashboard/chats",
                icon: <LuMail className="w-6 h-6" />,
            }
        ]
    },
    {
        section: "Services",
        links: [
            {
                label: "Projects",
                href: "/user/dashboard/projects",
                icon: <LuSchool className="w-6 h-6" />,
            },
            {
                label: "Samples",
                href: "/user/dashboard/sample",
                icon: <LuShieldCheck className="w-6 h-6" />,
            },
            {
                label: "Reports",
                href: "/user/dashboard/reports",
                icon: <LuClipboardCheck className="w-6 h-6" />,
            },
            {
                label: "Estimation",
                href: "/user/dashboard/invoices",
                icon: <LuCalculator className="w-6 h-6" />,
            },
        ]
    },
    {
        section: "Grievances",
        links: [
            {
                label: "Customer Support",
                href: "/user/dashboard/support",
                icon: <LuHeadphones className="w-6 h-6" />,
            },
        ]
    },
]