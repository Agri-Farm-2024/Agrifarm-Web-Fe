import React from 'react';
import styles from './ManageStandardProcessPage.module.css';
import {Descriptions, Image, Modal, Tag} from 'antd';
import {formatDate, formatNumber} from '../../utils';

const API = 'https://api.agrifarm.site';
export const ManageStandardProcessDetailModal = ({
	selectedProcess,
	handleModalClose,
	isModalOpen,
}) => {
	function unitMaterialMapping(unit) {
		const unitMapping = {
			package: 'Túi',
			bag: 'Bao',
			piece: 'Cái',
			bottle: 'Chai',
			square_meter: 'm2',
		};

		return unitMapping[unit] || '';
	}

	const detailItems = selectedProcess && [
		{
			key: 'processId',
			label: 'ID quy trình',
			children: <p>{selectedProcess.process_technical_standard_id}</p>,
		},
		{
			key: 'processName',
			label: 'Tên quy trình',
			children: <p>{selectedProcess.name}</p>,
		},
		{
			key: 'plant',
			label: 'Giống cây',
			children: <p>{selectedProcess.plant_season?.plant?.name}</p>,
		},
		{
			key: 'plantSeason',
			label: 'Mùa vụ',
			children: (
				<p>{`Mùa vụ ${selectedProcess?.plant_season?.plant?.name} Tháng ${selectedProcess?.plant_season?.month_start}`}</p>
			),
		},
		{
			key: 'expertResponsible',
			label: 'Người chịu trách nhiệm',
			children: <p>{selectedProcess?.expert?.full_name}</p>,
		},
		{
			key: 'status',
			label: 'Trạng thái',
			children: (
				<>
					{selectedProcess.status == 'accepted' && (
						<Tag color="green">Có thể sử dụng</Tag>
					)}
					{selectedProcess.status == 'in_active' && (
						<Tag color="default">Ngưng sử dụng</Tag>
					)}
					{selectedProcess.status == 'rejected' && (
						<Tag color="red">Không đạt yêu cầu</Tag>
					)}
					{selectedProcess.status == 'pending' && <Tag color="gold">Chờ phê duyệt</Tag>}
				</>
			),
		},
		{
			key: 'created_at',
			label: 'Ngày tạo',
			children: <p>{formatDate(selectedProcess?.created_at)}</p>,
		},
		{
			key: 'updated_at',
			label: 'Ngày cập nhật gần nhất',
			children: <p>{formatDate(selectedProcess?.updated_at)}</p>,
		},
		{
			key: 'plan_farming',
			label: 'Kế hoạch canh tác',
			children: (
				<>
					{selectedProcess.process_standard_stage &&
						selectedProcess.process_standard_stage.map((plan, stageIndex) => (
							<div key={`Plan stage ${stageIndex}`}>
								<div style={{paddingLeft: 10, fontWeight: 'bold'}}>
									<p className={styles.title} style={{width: '70%'}}>
										{` Giai đoạn ${plan.stage_numberic_order}: ${plan.stage_title} - Ngày ${plan.time_start == plan.time_end ? plan.dayFrom : `${plan.time_start} đến ngày ${plan.time_end}`}`}
									</p>
								</div>
								{plan.process_standard_stage_content &&
									plan.process_standard_stage_content.length > 0 &&
									plan.process_standard_stage_content.map((action, stepIndex) => (
										<div
											key={`Stage ${stageIndex}Step ${stepIndex}`}
											style={{paddingLeft: 20}}
											className={styles.bookingItem}
										>
											<p className={styles.title}>
												{`Ngày ${action.time_start == action.time_end ? action.time_start : `${action.time_start} - ngày ${action.time_end}`}: ${action.title}`}
											</p>
											<p className={styles.content}>{action.content}</p>
										</div>
									))}
								{plan.process_standard_stage_material &&
									plan.process_standard_stage_material.length > 0 && (
										<p
											className={styles.title}
											style={{paddingLeft: 20, fontWeight: 'bold'}}
										>
											Vật tư cần cho giai đoạn {plan.stage_numberic_order}
										</p>
									)}
								{plan.process_standard_stage_material &&
									plan.process_standard_stage_material.length > 0 &&
									plan.process_standard_stage_material.map(
										(material, materialIndex) => (
											<ul
												key={`Stage ${stageIndex} Material ${materialIndex}`}
												style={{paddingLeft: 40}}
												className={styles.bookingItem}
											>
												<li>
													<div
														style={{
															display: 'flex',
															alignItems: 'center',
															gap: '20px',
														}}
													>
														<Image
															src={`${API}${material.material.image_material}`}
															alt="Material Image"
															style={{
																width: 50,
																height: 50,
																borderRadius: 5,
															}}
															fallback="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
														/>
														<p>{`${material.material.name} - ${material.quantity} ${unitMaterialMapping(material.material.unit)}`}</p>
													</div>
												</li>
											</ul>
										)
									)}
							</div>
						))}
				</>
			),
		},
	];

	return (
		<Modal
			title={<span style={{fontSize: '1.5rem'}}>Thông tin quy trình</span>}
			open={isModalOpen}
			onCancel={handleModalClose}
			okButtonProps={{style: {display: 'none'}}}
			centered
			width={1000}
		>
			{selectedProcess && (
				<Descriptions
					style={{marginTop: 20}}
					labelStyle={{width: '15rem', fontWeight: 'bold'}}
					column={1}
					bordered
					items={detailItems}
				/>
			)}
		</Modal>
	);
};
