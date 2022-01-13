### ROUTES ###

### HOMEPAGE – BREAD ###

Browse – USER can see featured items, or filter by price
	= GET / listings
Read – USER can see specific listing information
	= GET / listings / :id
Edit – ADMIN can edit data for specific listing (includes mark as SOLD!)
	= POST / listings / :id
Add – ADMIN can add a listing
    = POST / listings
Delete – ADMIN can delete specific listing
	= POST / listings / :id / delete

### FAVOURITES – BREAD ###

Browse – USER can view all their favourites
	= GET / favourites
Read – USER can view specific favourite
	= GET / favourites / :id
Add – USER can add a favourite
	= POST / favourites
Delete – USER can remove a favourite from their list of favourites
	= POST / favourites / :id / delete


### MESSAGES – BREAD ###

Browse – USER can view all their messages
	= GET / messages
Read – USER can read a specific message
	= GET / messages / :id
Add – USER can send a message
	= POST / messages
