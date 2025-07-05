import { create } from "zustand";
import type { User } from "@/types/user";

interface UserState {
	user: User;
	setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: {
		isLoggedIn: false,
	},
	setUser: (user) => {
		set({
			user,
		});
	},
}));
