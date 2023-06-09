import { useMutation } from '@tanstack/react-query';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getUserInfoByUid, registrationNewUser } from '../api';
import { IGetUserInfoByUid } from '../types';
import { useState, Dispatch } from 'react';
import { createFormData } from '@/shared/lib/CreateFormData';
import { nanoid } from 'nanoid';
import { IFormDataObject } from '@/shared/lib/CreateFormData/types';
import { RegistrationInfoFieldsTypes } from './../types';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { updateUserInfo } from '@/entities/user';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/shared/lib/firebase';

export function useFirebaseAuth(): {
	googleAuth: () => void;
	githubAuth: () => void;
	createAccount: (email: string, password: string, name: string) => void;
	signOutAccount: () => void;
	getAuthState: () => void;
} {
	const dispatch = useAppDispatch();
	const navigation = useNavigate();

	const [registrationUserInfo, setRegistrationUserInfo] = useState<Record<RegistrationInfoFieldsTypes, string>>({ uid: '', nickname: '', settingsCode: '' });

	const registrationNewUserMutation = useMutation({
		mutationFn: (formData: FormData) => registrationNewUser(formData),
		onSuccess: ({ userResponse: { nickname, userId, rating } }) => {
			dispatch(updateUserInfo({ nickname, userId, rating, isAuth: true }));
			navigation('/');
		},
		onError: (res) => console.log(res),
	});

	const signInMutation = useMutation({
		mutationFn: (params: IGetUserInfoByUid) => getUserInfoByUid(params),
		onSuccess: ({ nickname, userId, rating }) => {
			dispatch(updateUserInfo({ nickname, userId, rating, isAuth: true }));
			navigation('/');
		},
		onError: (err) => {
			const registrationInfo: Array<IFormDataObject> = [];
			for (const item of Object.keys(registrationUserInfo)) {
				registrationInfo.push({
					key: item,
					value: registrationUserInfo[item as RegistrationInfoFieldsTypes],
				});
			}
			console.log(registrationInfo);
			const formData = createFormData(registrationInfo);
			registrationNewUserMutation.mutate(formData);
		},
	});

	const userInfoByUidMutation = useMutation({
		mutationFn: (params: IGetUserInfoByUid) => getUserInfoByUid(params),
		onSuccess: ({ nickname, userId, rating }) => {
			dispatch(updateUserInfo({ nickname, userId, rating, isAuth: true }));
		},
	});

	function googleAuth() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(({ user }) => {
				setRegistrationUserInfo({ uid: user.uid, nickname: user.displayName ?? 'user' + nanoid(), settingsCode: nanoid() });
				signInMutation.mutate({ uid: user.uid });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function githubAuth() {
		const provider = new GithubAuthProvider();
		signInWithPopup(auth, provider)
			.then(({ user }) => {
				setRegistrationUserInfo({ uid: user.uid, nickname: user.displayName ?? 'user' + nanoid(), settingsCode: nanoid() });
				signInMutation.mutate({ uid: user.uid });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function createAccount(email: string, password: string, name: string) {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}

	function signOutAccount() {
		signOut(auth)
			.then(() => {
				console.log('sign out');
			})
			.catch((error) => {
				console.log('upsss');
			});
	}

	function getAuthState() {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				userInfoByUidMutation.mutate({ uid: user.uid });
			}
		});

		return false;
	}

	return { googleAuth, githubAuth, createAccount, signOutAccount, getAuthState };
}
