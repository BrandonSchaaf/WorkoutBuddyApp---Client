$(function(){
	$.extend(WorkoutLog, {
		profile: {
			selectedArray: [],

			toggleSelected: function(){
				let currentVal = parseInt($(this).attr('data-selected')) 	// initially 0
				let newVal

				if(!currentVal){											// !0 == true
					newVal = currentVal + 1
					$(this).removeClass('workoutImage')
					$(this).addClass('selected')
				} else {													// !1 == false
					newVal = currentVal - 1
					$(this).removeClass('selected')
					$(this).addClass('workoutImage')
				}
				

				$(this).attr('data-selected', newVal)

				// console.log($(this).attr('id'), $(this).attr('data-selected'))
			},

			setArray: function(){
				// while loop - while (true) if there's anything in selectedArray [0], selectedarray.shift / else: (false)
				let imageArray = $('.toggleImage')
				for(let i = 0; i < imageArray.length; i++){
					if(parseInt($(imageArray[i]).attr('data-selected'))){
						WorkoutLog.profile.selectedArray.push(imageArray[i].id)
					}
				}
			},

			sendRequest: function() {
				WorkoutLog.profile.setArray()

				let selectedData = {
					desc: WorkoutLog.profile.selectedArray
				}

				console.log(selectedData)

				$.ajax({
					type: 'POST',
					url: WorkoutLog.API_BASE + 'definition',
					data:JSON.stringify(selectedData),
					contentType: 'application/json'
				})
			}
		}
	})

	$(".toggleImage").click(WorkoutLog.profile.toggleSelected)
	$("#def-save").click(WorkoutLog.profile.sendRequest)
})