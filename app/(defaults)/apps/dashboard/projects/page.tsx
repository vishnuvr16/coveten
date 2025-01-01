import ComponentsAppsProjects from '@/components/apps/dashboard/projects/components-apps-projects';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Projects',
};

const Projects = () => {
    return <ComponentsAppsProjects />;
};

export default Projects;
