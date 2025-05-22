import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

const StarRating = ({rating, handleRatingChange, cursorPointer=false}) => {
  return (
    <div>
        {
            [1,2,3,4,5].map((star, idx) => (
                <Button
                    key={idx}
                    variant='outline'
                    size='icon'
                    onClick={handleRatingChange ? () => handleRatingChange(star) : null}
                    className={`rounded-full transition-colors border-none
                        ${cursorPointer ? 'cursor-pointer' : ''}
                        ${star <= rating ? 'text-yellow-500' : ''}
                    `}
                >
                    <StarIcon className={`h-6 w-6 ${star <= rating ? 'fill-yellow-500' : 'fill-black'}`}/>
                </Button>
            )) 
        }
    </div>
  )
}

export default StarRating