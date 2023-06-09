import classNames from 'classnames';
import { AvatarProps } from './types';
import './styles.scss';
import avatarPNG from './assets/avatar.png';

const SIZES = {
	small: 42,
	medium: 64,
	large: 100,
};

export const Avatar: React.FC<AvatarProps> = ({ size = 'medium', alt = 'avatar', src, className }) => {
	return <img className={classNames(`avatar avatar--${size}`, className)} alt={alt} src={avatarPNG} width={SIZES[size]} height={SIZES[size]} />;
};
