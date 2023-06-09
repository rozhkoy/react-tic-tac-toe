import { AccountManagement, SignInForm, SignInWith } from '@/features/accountAuth';
import { AuthFrame } from '@/shared/ui/authFrame';
import { Container } from '@/shared/ui/container';
import { FormHeader } from '@/shared/ui/formHeader';

export const SignIn = () => {
	return (
		<AuthFrame>
			<Container size="small">
				<FormHeader heading={'Welcome'} subHeading={'Glad to see you!'} />
				<SignInForm/>
				<AccountManagement />
				<SignInWith />
			</Container>
		</AuthFrame>
	);
};
