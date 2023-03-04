import React from 'react';
import { useStore } from 'effector-react';
import { Link, PanelHeaderBack, PanelSpinner, Text } from '@vkontakte/vkui';
import {
	Icon24PenOutline,
	Icon28ReportOutline,
	Icon28SettingsOutline,
	Icon56ReportOutline,
	Icon20UsersOutline,
} from '@vkontakte/icons';
import { useRouter } from '@happysanta/router';
import { userStateService } from '../../../state/user';
import {
	actionSheetService,
	alertService,
	popoutStateService,
	snackBarService,
} from '../../../state/popouts';
import { useLocationParams } from '../../../router/useLocationParams';
import {
	COMMUNITY_JOIN_ROUT,
	PROFILE_COMMUNITIES_ROUTE,
	PROFILE_DETAIL_ROUTE,
	PROFILE_EDIT_ROUTE,
	REVIEWS_LIST_ROUTE,
	SETTINGS_ROUTE,
} from '../../../router/routes';
import { wordDeclension } from '../../../modules/utils/wordDeclension';
import { withOnboarding } from '../../../modules/utils/withOnboarding';
import useMount from '../../../modules/utils/useMount';
import { ServerSvg } from '../../../modules/components/other/ServerSvg';
import { RoundLabel } from '../../../modules/components/other/RoundLabel';
import { RoundLabelWrap } from '../../../modules/components/other/RoudLabelWrap';
import { PropertyContainer } from '../../../modules/components/other/PropertyContainer';
import { MainLayoutNavBar } from '../../../modules/components/layouts/MainLayout/MainLayoutNavBar';
import { MainLayoutHeader } from '../../../modules/components/layouts/MainLayout/MainLayoutHeader';
import { MainLayoutFooter } from '../../../modules/components/layouts/MainLayout/MainLayoutFooter';
import { MainLayoutContent } from '../../../modules/components/layouts/MainLayout/MainLayoutContent';
import { MainLayout } from '../../../modules/components/layouts/MainLayout';
import {
	useComplainAboutUserM,
	useGetMeQ,
	useGetUserReviewListQ,
	useUserProfileInfoQ,
} from '../../../modules/apollo/apolloRequestHooks/users';
import { useGetCommunityUserListQ } from '../../../modules/apollo/apolloRequestHooks/community';
import { useGetDealWithUserQuery } from '../../../modules/apollo/apolloQueries/deals/__generated__/index.graphql';
import { UrlButton } from './UrlButton';
import { TextLabel } from './TextLabel';
import { ReviewList } from './ReviewList';
import { DetailUserSection } from './DetailUserSection';
import { ButtonMassage } from './ButtonMassage';

import './styles.css';

console.log('✅ element    ', element);

export type ProfileDetailPageProps = {
	id: typeof PROFILE_DETAIL_ROUTE,
};

const _ProfileDetailPage: React.FC<ProfileDetailPageProps> = ({ id: panelId }) => {
	const { id } = useLocationParams();

	const router = useRouter();

	const { data: dataMe } = useGetMeQ();

	const { data, loading } = useUserProfileInfoQ({ id });
	const currentUserId = useStore(userStateService.$userId);
	const isCurrentUser = id === currentUserId;

	const [complainAboutUserM] = useComplainAboutUserM();

	const onClickBack = () => {
		router.popPage();
	};

	const { data: dataCommunityUserList } = useGetCommunityUserListQ({
		input: {
			limit: 6,
			userId: id,
		},
	});

	const { data: reviewData, loading: reviewLoading } = useGetUserReviewListQ({
		limit: 5,
		userId: id,
	});

	const { data: getDealForWishData, refetch } = useGetDealWithUserQuery({
		variables: {
			userId: id,
		},
	});

	useMount(() => {
		refetch();
	});

	if (loading || !data || !dataMe || !dataCommunityUserList || !reviewData) {
		return (
			<MainLayout id={panelId}>
				<MainLayoutHeader left={<PanelHeaderBack onClick={onClickBack} />}>
					Профиль
				</MainLayoutHeader>
				<MainLayoutContent>
					<PanelSpinner />
				</MainLayoutContent>
			</MainLayout>
		);
	}

	const userInfo = data.user;

	const userInfoTextCommunity = `${userInfo.counters.communities} ${wordDeclension(
		userInfo.counters.communities,
		['сообщество', 'сообществa', 'сообществ'],
	)}`;

	const openComplainUserAlert = () => {
		alertService.open({
			title: 'Отправить жалобу?',
			text: (
				<>
					Наши модераторы рассмотрят это обращение и заблокируют профиль пользователя, если он
					нарушает наши{' '}
					<Link href='https://взаимно.добро.рф/html/service_rules' target='_blank'>
						Правила сервиса
					</Link>
					.
				</>
			),
			buttons: [
				{
					size: 'l',
					text: 'Отправить',
					closeOnClick: true,
					onClick: async () => {
						try {
							await complainAboutUserM({ variables: { input: { userId: id } } });
							snackBarService.createSnackBar({
								type: 'success',
								text: 'Жалоба успешно отправлена',
							});
						} catch {
							snackBarService.createSnackBar({
								type: 'error',
								text: 'Не удалось отправить жалобу',
							});
						} finally {
							popoutStateService.closePopout();
						}
					},
					mode: 'primary',
				},
				{
					text: 'Отмена',
					closeOnClick: true,
					mode: 'secondary',
					size: 'l',
				},
			],
			icon: <Icon56ReportOutline />,
			iconFill: 'primary',
		});
	};

	return (
		<MainLayout id={id}>
			<MainLayoutHeader left={<PanelHeaderBack onClick={onClickBack} />}>Профиль</MainLayoutHeader>
			<MainLayoutContent withNoPadding>
				<DetailUserSection
					avatarUrl={userInfo.avatar.origUrl}
					city={userInfo.location.title}
					counterDeals={userInfo.counters.completedDeals}
					rat={userInfo.rating.rate}
					registerDate={userInfo.registerDate}
					reviewCnt={userInfo.rating.reviewCnt}
					title={`${userInfo.firstName} ${userInfo.lastName}`}
					onClick={() => {
						actionSheetService.open(
							isCurrentUser
								? {
										items: [
											{
												title: 'Редактировать профиль',
												icon: <Icon24PenOutline height={28} width={28} />,
												onClick: () => {
													router.pushPage(PROFILE_EDIT_ROUTE);
												},
											},
											{
												title: 'Настройки',
												icon: <Icon28SettingsOutline />,
												onClick: () => {
													router.pushPage(SETTINGS_ROUTE);
												},
											},
										],
										closeOnClick: true,
								  }
								: {
										items: [
											{
												title: 'Пожаловаться',
												icon: <Icon28ReportOutline />,
												onClick: openComplainUserAlert,
											},
										],
										closeOnClick: true,
								  },
						);
					}}
				/>

				{dataMe?.me.id !== data?.user.id &&
				getDealForWishData?.dealWithUser.deal !== null &&
				data?.user.authInfo.length !== 0 ? (
					<ButtonMassage vkId={data?.user.authInfo[0].id} />
				) : undefined}

				<PropertyContainer
					className='profile-detail__links'
					title={userInfo.externalInfo.dobroInfo?.title}
				>
					{userInfo.externalInfo.dobroInfo?.items.map(item => {
						if (item.__typename === 'UrlButton') {
							return (
								<UrlButton
									buttonType='LINK'
									href={item.url}
									isEnabled={item.isEnabled}
									key={item.title}
									origUrl={item.icon?.origUrl}
									title={item.title}
								/>
							);
						}
						if (item.__typename === 'TextLabel') {
							return <TextLabel key={item.text} origUrl={item.icon?.origUrl} text={item.text} />;
						}

						return <></>;
					})}
				</PropertyContainer>

				{userInfo.counters.communities > 0 && dataCommunityUserList && (
					<PropertyContainer withPadding className='profile-detail__links' title='Сообщества'>
						<Link
							className='profile-detail__link'
							onClick={() => {
								if (userInfo.counters.communities > 1) {
									router.pushPage(PROFILE_COMMUNITIES_ROUTE, { userId: userInfo.id });
								} else {
									router.pushPage(COMMUNITY_JOIN_ROUT, {
										id: dataCommunityUserList.userCommunityList.items[0].id,
									});
								}
							}}
						>
							<Icon20UsersOutline />
							{userInfoTextCommunity}
						</Link>
					</PropertyContainer>
				)}

				{userInfo.infoText && (
					<PropertyContainer withPadding className='profile-detail__links' title='О себе'>
						<Text className='profile-detail__about-me-text' weight='regular'>
							{userInfo.infoText}
						</Text>
					</PropertyContainer>
				)}

				{userInfo.skills.length !== 0 && (
					<PropertyContainer withPadding className='profile-detail__links' title='Умею'>
						<>
							<RoundLabelWrap>
								{userInfo.skills.map(item => {
									return (
										<RoundLabel
											before={<ServerSvg mode='s' size={16} src={item.icon.origUrl} />}
											key={item.id}
										>
											<div className='skills__text'>{item.title}</div>
										</RoundLabel>
									);
								})}
							</RoundLabelWrap>
							{userInfo.skillDetails && (
								<div className='profile-detail__text-skills'>{userInfo.skillDetails}</div>
							)}
						</>
					</PropertyContainer>
				)}

				<PropertyContainer
					right={
						userInfo.rating.reviewCnt > 5 && (
							<Link
								className='profile-detail__show-all-review'
								onClick={() => router.pushPage(REVIEWS_LIST_ROUTE, { userId: userInfo.id })}
							>
								Показать все
							</Link>
						)
					}
					title={`Отзывы: ${userInfo.rating.reviewCnt}`}
				>
					<ReviewList items={reviewData?.user.reviewList.reviews ?? []} loading={reviewLoading} />
				</PropertyContainer>
			</MainLayoutContent>
			<MainLayoutFooter>
				<MainLayoutNavBar />
			</MainLayoutFooter>
		</MainLayout>
	);
};

export const ProfileDetailPage = React.memo(withOnboarding(_ProfileDetailPage));
