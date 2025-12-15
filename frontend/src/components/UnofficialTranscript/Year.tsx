import '../../cssFiles/UTComponents.css'
import { type UTYear} from '../../data/UnofficialTranscriptData'
import Term from './Term';
        
interface UTYearProps {
  yearData: UTYear;
}

const Year = ({ yearData }: UTYearProps) => {
  return (
    <div className="ut-year">
      {yearData.terms.map((term) => (
        <Term key={term.term} term={term} year={yearData.year} />
      ))}
    </div>
  );
};

export default Year;