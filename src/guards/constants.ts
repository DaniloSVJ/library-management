import { SetMetadata } from '@nestjs/common';


export const jwtConstants = {
    secret: `TM;CB|+^'w'$YB&;b3oTX;-o7hwZelY$`
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);