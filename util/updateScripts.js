db.users.updateMany({}, {$set: {cashBalance: 0 ,cashAllocated:0}}, false, true)
