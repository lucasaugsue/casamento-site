import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
	  top: 10,
	  left: 'calc(-50% + 16px)',
	  right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
	  [`& .${stepConnectorClasses.line}`]: {
		borderColor: '#f04d3b',
	  },
	},
	[`&.${stepConnectorClasses.completed}`]: {
	  [`& .${stepConnectorClasses.line}`]: {
		borderColor: '#f04d3b',
	  },
	},
	[`& .${stepConnectorClasses.line}`]: {
	  borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
	  borderTopWidth: 3,
	  borderRadius: 1,
	},
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
	display: 'flex',
	height: 22,
	alignItems: 'center',
	...(ownerState.active && {
	  color: '#f04d3b',
	}),
	'& .QontoStepIcon-completedIcon': {
	  color: '#f04d3b',
	  zIndex: 1,
	  fontSize: 18,
	},
	'& .QontoStepIcon-circle': {
	  width: 8,
	  height: 8,
	  borderRadius: '50%',
	  backgroundColor: 'currentColor',
	},
}));

function QontoStepIcon(props) {
	const { active, completed, className } = props;
  
	return (
	  <QontoStepIconRoot ownerState={{ active }} className={className}>
		{completed ? (
		  <Check className="QontoStepIcon-completedIcon" />
		) : (
		  <div className="QontoStepIcon-circle" />
		)}
	  </QontoStepIconRoot>
	);
}
  
QontoStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
};

export default function HorizontalLinearStepper({
	steps,
	activeStep,
	skipped,
	getStepBody
}) {

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	return (
	<Box sx={{ width: '100%' }}>
		{/* parte do header do stepper */}  
		<Stepper 
			activeStep={activeStep}
			sx={{ padding: "0 3vw 4vh 0vw" }} 
			connector={<QontoConnector />}
		>
			{steps.map((label, index) => {
				// if (isStepOptional(index)) {
				// 	labelProps.optional = (
				// 		<Typography variant="caption">Optional</Typography>
				// 	);
				// }
				if (isStepSkipped(index)) {
					stepProps.completed = false;
				}
				return (
				<Step key={`${label};;${index}`}>
					<StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
				</Step>
				);
			})}
		</Stepper>

		{/* parte do boddy do stepper */}  
		{getStepBody()}

		{/* parte do boddy do stepper */}  
		{/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
			<Button
				color="inherit"
				disabled={activeStep === 0}
				onClick={handleBack}
				sx={{ mr: 1 }}
			>
				Back
			</Button>
			
			<Box sx={{ flex: '1 1 auto' }} />

			{activeStep === steps.length
				? <Box sx={{ display: 'flex', flexDirection: 'row' }}>
					<Button onClick={handleReset}>Reset</Button>
				</Box>
				: <div/>
			}            
			
			<Button onClick={handleNext}>
				{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
			</Button>
		</Box> */}
	</Box>
	);
}