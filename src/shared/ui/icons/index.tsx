import {
	BackArrowIcon,
	BehanceIcon,
	CupIcon,
	FacebookIcon,
	GithubIcon,
	GoogleIcon,
	LogoutIcon,
	LinkInIcon,
	LoginIcon,
	MoonIcon,
	MusicIcon,
	RestartIcon,
	SearchIcon,
	SoundIcon,
	SunIcon,
} from './Static';
import { IconNamesTypes, IconProps } from './types';
import './styles.scss';
import classNames from 'classnames';

const icons: Record<IconNamesTypes, React.ReactNode> = {
	back: <BackArrowIcon />,
	facebook: <FacebookIcon />,
	github: <GithubIcon />,
	google: <GoogleIcon />,
	behance: <BehanceIcon />,
	linkedin: <LinkInIcon />,
	cup: <CupIcon />,
	logout: <LogoutIcon />,
	login: <LoginIcon />,
	moon: <MoonIcon />,
	music: <MusicIcon />,
	restart: <RestartIcon />,
	search: <SearchIcon />,
	sound: <SoundIcon />,
	sun: <SunIcon />,
};

export function Icon({ name, className }: IconProps) {
	const classes = classNames('icon', className);
	return <span className={classes}>{icons[name]}</span>;
}
