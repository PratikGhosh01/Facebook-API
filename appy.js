 // main document ready function to check if dom is loaded fully or not
  $( document ).ready(function() {

    var myFacebookToken = 'EAACEdEose0cBADSfiON1qlN1CUmPtGKHEZBVUZCUhdO27I9Hky98cEgzhp3cmDYviZAbw84IZC11xRQxoE7F5hCN0EJLZBN1SY8wZBSIZCrETmF4QwiQ0LwDMOTVSnsTILJgHZCmQLXpXuwgiaFlbqsEYE3yFKcXOtE4qhoJ9DZBH4sJ5746u26cyakxOvSmCErNSL2cK44gMWwZDZD';

    function getFacebookInfo(){

        $.ajax('https://graph.facebook.com/me?fields=id,email,birthday,hometown,gender,age_range,relationship_status,posts{created_time,type,full_picture,story,story_tags,message,source,likes,comments,with_tags,link},name&access_token='+myFacebookToken,{

                success : function(response){
                    console.log(response);
                    console.log(typeof(response));
                    $("#myEmail").text(response.email);
                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
                    $("#myHomeTown").text(response.hometown.name);
                    $("#myBirthday").text(response.birthday);
                    $("#myGender").text(response.gender);
                    $("#myRelation").text(response.relationship_status);
                    $("#myName").text(response.name);


                   /* for(i=0;i<10;i++)
                        if(response.posts.data[i].story)
                            {
                            $("#feed"+i).append("<br>"+" "+response.posts.data[i].story);
                            }
                        else(response.posts.data[i].message)
                            {
                            $("#feed"+i).append("<br>"+" "+response.posts.data[i].message);
                            }
*/
                   var myFeed = $.map(response.posts.data, function(x) 
                    {
                        //return x.type;
                        
                            if (x.type == "status") {
                                return x.story + "<br>" + x.message +"<br>"+"<hr>"+"<br>";
                            
                              }

                              //for photo
                              else if (x.type == "photo") {
                                  var image = x.story +"<br>" + "<img src=" + x.full_picture+">" +"<br>"+"<hr>"+"<br>";
                                  
                                  return image;
                                
                              }

                              //for video
                              else if (x.type == "video") {
                                  var video= x.story +"<br>" + "<video controls> <source src" + x.source + "type="+"video/mp4"+"></video>"+"<br>"+"<hr>"+"<br>"
                                  return video;
                                
                              }
                    
                                });
                   $("#myFeed").html(myFeed);

              }  
            }//end argument list 



        );// end ajax call 


    }// end get facebook info

    $("#facebookBtn").on('click',getFacebookInfo)



  });