"use client";

import { useEffect, useReducer, useState } from "react";
import type { ChannelData } from "~/workloads/stateless/broadcast/channel-data.js";
import { useWebSocket } from "~/workloads/stateless/broadcast/client/broadcast-provider.jsx";
import type { RouteParams } from "~/workloads/stateless/broadcast/types.js";

export function broadcastClient<
	// oxlint-disable-next-line @typescript-eslint/no-explicit-any
	C extends Record<string, ChannelData<any>>,
>() {
	const useSubscription = <D extends keyof C & string>(
		channel: D,
		params: RouteParams<D>,
	) => {
		type StateType = typeof channel extends string
			? C[typeof channel] extends ChannelData<infer P>
				? P
				: never
			: never;

		const [last, setLast] = useState<StateType | null>(null);
		const [all, setAll] = useReducer((prevItems, newItem) => {
			return prevItems.concat(newItem);
		}, [] as StateType[]);
		const [subscribe, setSubscribed] = useState(false);
		const client = useWebSocket<C>();

		useEffect(() => {
			if (client.connected && !subscribe) {
				// oxlint-disable-next-line @typescript-eslint/no-explicit-any
				client.subscribeTo(channel as any, params, (payload) => {
					setLast(payload as StateType);
					setAll(payload);
				});
				setSubscribed(true);
			}
		}, [client, channel, params, subscribe]);

		return { last, all };
	};
	return { useSubscription };
}
