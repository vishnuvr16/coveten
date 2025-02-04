
export interface Module {
    id: string;
    ticket: string;
    title: string;
    status: 'NEW' | 'ACCEPTED' | 'UNDER_REVIEW' | 'COMPLETED' | 'REJECTED';
    description?: string;
    files?: Array<{
      name: string;
      url: string;
    }>;
    isViewed: boolean;
    rejectedReason?: string;
    createdAt: string;
  }
  