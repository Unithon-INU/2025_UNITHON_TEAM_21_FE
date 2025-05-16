import React, {useEffect, useState} from 'react';
import VolunteerItem from '@/pages/Volunteer/VolunteerCategory/components/VolunteerItem';
import {getVltrSearchWordList} from '@/types/volunteerTyps';

import {xml2Json} from '@/utils/xml2json';

import {ColWrapper} from '@/components/layout/ContentWrapper';

export default function RecommendActivity() {
    const [volunteerData, setVolunteerData] = useState<getVltrSearchWordList>();
    const items = Array.isArray(volunteerData?.body?.items?.item)
        ? volunteerData.body.items.item
        : volunteerData?.body?.items?.item
        ? [volunteerData.body.items.item]
        : [];
    useEffect(() => {
        const fetchvolunteerData = async () => {
            try {
                const response = await fetch(
                    'http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrSearchWordList?upperClCode=0400&schSido=6280000',
                );
                if (!response.ok) {
                    throw new Error('API 호출 실패');
                }
                const xml = await response.text();
                const json = xml2Json(xml);
                setVolunteerData(json);
            } catch (e: any) {
                console.log(e);
            }
        };
        fetchvolunteerData();
    }, []);
    return (
        <ColWrapper title="Recoommend Volunteer">
            {items.slice(0, 3).map((item: any, index: number) => (
                <VolunteerItem item={item} key={index} />
            ))}
        </ColWrapper>
    );
}
