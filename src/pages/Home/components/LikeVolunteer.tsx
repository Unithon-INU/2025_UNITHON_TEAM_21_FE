import VolunteerItem from '@/pages/Volunteer/VolunteerCategory/components/VolunteerItem';

import {ColWrapper} from '@/components/layout/ContentWrapper';
import {useSelector} from 'react-redux';

export default function LikeVolunteer() {
    const likedList = useSelector((state: any) => state.liked.likedList);
    if (likedList.length === 0) return null;
    return (
        <ColWrapper title="관심 봉사활동" href="Userlikedvol">
            {likedList.slice(0, 3).map((item: any, index: number) => (
                <VolunteerItem item={item} key={index} />
            ))}
        </ColWrapper>
    );
}
