/*\
 * Donald
 [ class ]
 **
 * Donald is the enemy of Chip and Dale, and always loses when fighting with them
 *
 * initially Donald starts with a happy mood
 *
 * creates a Mr.Donald duck
 = (object) a Donald object
 > Usage
 | var donald = new Donald();
\*/
function Donald()
{
	this.mood='happy';
}

/*\
 * Donald.mood
 [ method ]
 **
 > getter
 - no parameter (null)
 = (string) current mood of Donald
 > setter
 * set the mood of Donald
 - mood (string)
 * possible values are:
 o 'happy' Donald is whistling
 o 'angry' Donald is going to attack the chipmunks!
 o 'upset' Donald loses his fight with them
\*/
Donald.prototype.mood=function(mood)
{
	if( mood===undefined)
	{
		return this.mood;
	}
	else
	{
		this.mood=mood;
	}
}

/*\
 * Donald.attack
 [ method ]
 **
 > Parameters
 - target (object) the target @Chipmunk to attack
 = (number) hp deducted from target
\*/
Donald.prototype.attack=function()
{
	return ;
}
