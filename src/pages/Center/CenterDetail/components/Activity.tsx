import {Text} from 'react-native';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import {getVltrSearchWordListItem} from '@/types/volunteerTyps';
import VolunteerItem from '@/pages/Volunteer/VolunteerCategory/components/VolunteerItem';

export default function Activity({items}: {items: getVltrSearchWordListItem[] | null}) {
    if (!items || items.length === 0) {
        return (
            <ColWrapper title="센터에서 진행중인 봉사활동">
                <Text className="text-base font-semibold text-font-gray">{'아직 진행중인 활동이 없네요...\n활동을 찾으면 바로 알려드릴게요!'}</Text>
            </ColWrapper>
        );
    }
    return (
        <ColWrapper title="센터에서 진행중인 봉사활동">
            {items.map((item, index) => (
                <VolunteerItem key={index} item={item} />
            ))}
        </ColWrapper>
    );
}
