import {ColWrapper} from '@/components/layout/ContentWrapper';
import {getVltrPartcptnItemListItem} from '@/types/volunteerTyps';
import VolunteerItem from './VolunteerItem';

export default function NearbyVolunteerMap({items}: {items: getVltrPartcptnItemListItem[] | null}) {
    if (!items) return null;

    return (
        <ColWrapper title="가까운 봉사활동">
            {items.slice(0, 3).map((item, index) => (
                <VolunteerItem key={index} item={item} />
            ))}
        </ColWrapper>
    );
}
