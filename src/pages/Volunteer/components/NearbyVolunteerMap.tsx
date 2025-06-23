import {KakaoMapManyMarkers} from '@/components/KakaoMap';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import {getVltrPartcptnItemListItem} from '@/types/volunteerTyps';

export default function NearbyVolunteerMap({items}: {items: getVltrPartcptnItemListItem[] | null}) {
    if (!items) return null;

    return (
        <ColWrapper title="근처 봉사 활동">
            <KakaoMapManyMarkers items={items} className="w-full h-[240px]" />
        </ColWrapper>
    );
}
