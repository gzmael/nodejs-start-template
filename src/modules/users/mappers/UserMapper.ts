import { User } from '@prisma/client';
import uploadConfig from '@config/upload';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';

class UserMapper {
  public static getAvatarUrl(user: User): string | null {
    if (!user.avatar) {
      return null;
    }

    if (uploadConfig.driver === 'disk') {
      return `${process.env.HOST}files/avatars/${user.avatar}`;
    }

    if (uploadConfig.driver === 's3') {
      return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/avatars/${user.avatar}`;
    }

    return 'no drive config';
  }

  private static socialNumberFormat(
    social_number?: string | null,
  ): string | null {
    if (!social_number) return null;
    const socialCleaned = social_number.replace(/[^\d]/g, '');

    return socialCleaned.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.***.***-$4',
    );
  }

  static toDTO(user: User, hiddenSocial = true): IUserResponseDTO {
    return {
      publicId: user.publicId,
      email: user.email,
      name: user.name,
      avatar_url: this.getAvatarUrl(user),
      addressId: user.addressId,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      cellphone: user.cellphone,
      full_name: `${user.name} ${user.lastName ? user.lastName : ''}`,
      lastName: user.lastName,
      status: user.status,
      type: user.type,
      socialNumber: hiddenSocial
        ? this.socialNumberFormat(user.socialNumber)
        : user.socialNumber,
    };
  }
}

export { UserMapper };
