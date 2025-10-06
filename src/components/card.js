import past from '../assets/images/pastIcon.png';
import present from '../assets/images/presentIcon.png';
import future from '../assets/images/futureIcon.png';

function Card({ position, title, artist }) {
    return (
        <div className='card' id='song'>
            <div className='label' id='artist'>
                {artist.toUpperCase()}
            </div>

            {position === 'past' &&
                <img src={past} className='image' alt='past symbol'/>
            }
            {position === 'present' &&
                <img src={present} className='image' alt='present symbol'/>
            }
            {position === 'future' &&
                <img src={future} className='image' alt='future symbol'/>
            }

            <div className='label' id='title'>
                {title.toUpperCase()}
            </div>
            
        </div>
    )
}

export default Card;