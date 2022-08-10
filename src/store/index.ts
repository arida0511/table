//상태관리시스템

import axios from 'axios';
import _ from 'lodash';

import { writable } from 'svelte/store';
export const priceData = writable<PriceUnit[]>([]);

function getUrl(days: number) {
	var url =
		'https://dashboard-mintscan.s3.ap-northeast-2.amazonaws.com/research/market/' + days + '.csv';
	return url;
}
export interface PriceUnit {
	denom: string;
	timestamp: number;
	price: number;
	marketCap: number;
	dayVolume: number;
}

//데이터 전처리의 기본 - 브라우저위에서 돌아감
//js기준으로는 note로 작성
export async function updateData(days: number) {
	const data = (await axios.get<string>(getUrl(days))).data;
	const prices = _(data.split('\n'))
		.drop(1)
		.map((l) => {
			const eles = l.split(',');
			return {
				denom: eles[0],
				timestamp: Number(eles[1]),
				price: Number(eles[2]),
				marketCap: Number(eles[3]),
				dayVolume: Number(eles[4])
			} as PriceUnit;
		})
		.value();
	priceData.set(prices);
}

/*
axios
    .get(url)
    .then((res)=>{
        console.log(res.data);
    }).catch((e) => {
        console.error(e);
    });
*/
