import type { Metadata } from 'next';
import { config } from '@/config';

export const metadata: Metadata = { title: `Goals | Dashboard | ${config.site.name}` };

export default function Head() {
    return (
        <>
            <title>{String(metadata.title)}</title>  {/* Convert to string explicitly */}
        </>
    );

}
