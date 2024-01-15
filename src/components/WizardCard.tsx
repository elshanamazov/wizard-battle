type WizardCardProps = {
	name: string;
	healthPoints: number;
	mannaPoints: number;
};

const WizardCard = ({ name, healthPoints, mannaPoints }: WizardCardProps) => {
	return (
		<div className="wizard-card">
			<div className="wizard-image-placeholder"></div>
			<div className="wizard-info">
				<h3 className="wizard-name">{name}</h3>
				<p className="wizard-health">Health: {healthPoints}</p>
				<p className="wizard-mana">Manna: {mannaPoints}</p>
			</div>
		</div>
	);
};

export default WizardCard;
