import React from 'react';

import {getVltrSearchWordList} from '@/types/volunteerTyps';

import VolunteerItem from '@/pages/Volunteer/VolunteerCategory/components/VolunteerItem';
import {ColWrapper} from '@/components/layout/ContentWrapper';

export default function RecommendVolunteer({items}: {items: getVltrSearchWordList | null}) {
    if (!items || !items.body || !items.body.items || !Array.isArray(items.body.items.item)) return null;
    const volunteerItems = items.body.items.item.slice(0, 3);

    return (
        <ColWrapper title="추천 봉사활동" href="volunteerCategory">
            {volunteerItems.map((item: any, index: number) => (
                <VolunteerItem item={item} key={index} />
            ))}
        </ColWrapper>
    );
}
