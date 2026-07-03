'use client';

import React from 'react';
import { PageHeader } from '@presentation/components/ui/page-header';
import { EmptyState } from '@presentation/components/ui/empty-state';
import { Card, CardContent } from '@presentation/components/ui/card';
import { useLanguage } from '@core/providers/language-provider';
import { Building2 } from 'lucide-react';

export default function Page() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <PageHeader title={t.pages.workspaceTitle} subtitle={t.pages.workspaceSubtitle} />
      <Card>
        <CardContent className="p-8">
          <EmptyState
            icon={<Building2 className="h-12 w-12" />}
            title={t.pages.workspaceTitle}
            description={t.pages.workspaceSubtitle}
          />
        </CardContent>
      </Card>
    </div>
  );
}
