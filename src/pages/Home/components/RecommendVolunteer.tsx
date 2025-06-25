import {getVltrSearchWordListItem} from '@/types/volunteerTyps';

import VolunteerItem from '@/pages/Volunteer/VolunteerCategory/components/VolunteerItem';
import {ColWrapper} from '@/components/layout/ContentWrapper';

export default function RecommendVolunteer({items}: {items: getVltrSearchWordListItem[] | null}) {
    if (!items) return null;
    const volunteerItems = items.slice(0, 3);

    return (
        <ColWrapper title="추천 봉사활동" href="volunteerCategory">
            {volunteerItems.map((item: any, index: number) => (
                <VolunteerItem item={item} key={index} />
            ))}
        </ColWrapper>
    );
}
