var boxopened = "";
var imgopened = "";
var count = 0;
var found =  0;

function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function shuffle() {
    var children = $("#boxcard").children();
    var child = $("#boxcard div:first-child");

    var array_img = new Array();

    for (i=0; i<children.length; i++) {
        array_img[i] = $("#"+child.attr("id")+" img").attr("src");
        child = child.next();
    }

    var child = $("#boxcard div:first-child");

    for (z=0; z<children.length; z++) {
        randIndex = randomFromTo(0, array_img.length - 1);

        // set new image
        $("#"+child.attr("id")+" img").attr("src", array_img[randIndex]);
        array_img.splice(randIndex, 1);

        child = child.next();
    }
}

function resetGame() {
    shuffle();
    $("img").hide();
    $("img").removeClass("opacity");
    count = 0;
    $("#msg").remove();
    $("#count").html("" + count);
    boxopened = "";
    imgopened = "";
    found = 0;
    return false;
}

$(document).ready(function() {
    $("#boxcard div").css( "background-color", "#" + Math.floor(Math.random()*16777215).toString(16));

    $("img").hide();
    $("#boxcard div").click(openCard);

    shuffle();

    function openCard() {

        id = $(this).attr("id");

        if ($("#"+id+" img").is(":hidden")) {
            $("#boxcard div").unbind("click", openCard);

            $("#"+id+" img").slideDown('fast');

            if (imgopened == "") {
                boxopened = id;
                imgopened = $("#"+id+" img").attr("src");
                setTimeout(function() {
                    $("#boxcard div").bind("click", openCard)
                }, 300);
            } else {
                currentopened = $("#"+id+" img").attr("src");
                if (imgopened != currentopened) {
                    // close again
                    setTimeout(function() {
                        $("#"+id+" img").slideUp('fast');
                        $("#"+boxopened+" img").slideUp('fast');
                        boxopened = "";
                        imgopened = "";
                    }, 400);
                } else {
                    // found
                    $("#"+id+" img").addClass("opacity");
                    $("#"+boxopened+" img").addClass("opacity");
                    found++;
                    boxopened = "";
                    imgopened = "";
                }

                setTimeout(function() {
                    $("#boxcard div").bind("click", openCard)
                }, 400);
            }


            count++;
            $("#count").html("" + count);

            if (found == 10) {
                msg = '<span id="msg">Congrats ! You Found All Sushi With </span>';
                $("span.link").prepend(msg);
            }
        }
    }
});


// VIDYO ======================================
// const OPEN_REMOTE_SLOT = "-1";
//
// function ShowRenderer(vidyoConnector, divId) {
//     var rndr = document.getElementById(divId);
//     vidyoConnector.ShowViewAt(divId, rndr.offsetLeft, rndr.offsetTop, rndr.offsetWidth, rndr.offsetHeight);
// }
//
// function onVidyoClientLoaded(status) {
//     var vidyoConnector;
//     var cameras = {};
//     var microphones = {};
//     var speakers = {};
//     var selectedLocalCamera = {id: 0, camera: null};
//     var cameraPrivacy = false;
//     var microphonePrivacy = false;
//     var remoteCameras = {};
//     var configParams = {};
//     var rendererSlots = ["1", OPEN_REMOTE_SLOT, OPEN_REMOTE_SLOT, OPEN_REMOTE_SLOT, OPEN_REMOTE_SLOT, OPEN_REMOTE_SLOT];
//
//     function showRenderers() {
//         ShowRenderer(vidyoConnector, "renderer0");
//         ShowRenderer(vidyoConnector, "renderer1");
//         ShowRenderer(vidyoConnector, "renderer2");
//         ShowRenderer(vidyoConnector, "renderer3");
//         ShowRenderer(vidyoConnector, "renderer4");
//         ShowRenderer(vidyoConnector, "renderer5");
//     }
//
//     window.onresize = function() {
//         showRenderers();
//     };
//     console.log("Status - " + status.state);
//     if(status.state == "READY"){
//         VC.CreateVidyoConnector({
//             viewId: null,              //"renderer"
//             viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default",
//             remoteParticipants: 16,
//             logFileFilter: "warning info@VidyoClient info@VidyoConnector",
//             logFileName: "VidyoConnector.log",
//             userData: 0
// //                    presentationAllowed: 0
//
//         }).then(function (vc) {
//             console.log("Created success");
//             vidyoConnector = vc;
//             parseUrlParameters(configParams);
//             registerDeviceListeners(vidyoConnector, cameras, microphones, speakers, rendererSlots, selectedLocalCamera, remoteCameras);
//             // handleDeviceChange(vidyoConnector, cameras, microphones, speakers);
//             // handleParticipantChange(vidyoConnector, rendererSlots, remoteCameras);
//
//             // // Populate the connectionStatus with the client version
//             // vidyoConnector.GetVersion().then(function(version) {
//             //     $("#clientVersion").html("v " + version);
//             // }).catch(function() {
//             //     console.error("GetVersion failed");
//             // });
//
//             // // If enableDebug is configured then enable debugging
//             // if (configParams.enableDebug === "1") {
//             //     vidyoConnector.EnableDebug({port:7776, logFilter: "warning info@VidyoClient info@VidyoConnector"}).then(function() {
//             //         console.log("EnableDebug success");
//             //     }).catch(function() {
//             //         console.error("EnableDebug failed");
//             //     });
//             // }
//
//             // // Join the conference if the autoJoin URL parameter was enabled
//             // if (configParams.autoJoin === "1") {
//             //     joinLeave();
//             // } else {
//             //     // Handle the join in the toolbar button being clicked by the end user.
//             //     $("#joinLeaveButton").one("click", joinLeave);
//             // }
//
//
//         }).catch(function (error) {
//             console.error("Create failed" + error);
//         })
//     }
// }
//
// function registerDeviceListeners(vidyoConnector, cameras, microphones, speakers, rendererSlots, selectedLocalCamera, remoteCameras) {
//     // Map the "None" option (whose value is 0) in the camera, microphone, and speaker drop-down menus to null since
//     // a null argument to SelectLocalCamera, SelectLocalMicrophone, and SelectLocalSpeaker releases the resource.
//     cameras[0]     = null;
//     microphones[0] = null;
//     speakers[0]    = null;
//
//     // Handle appearance and disappearance of camera devices in the system
//     vidyoConnector.RegisterLocalCameraEventListener({
//         onAdded: function(localCamera) {
//             cameras[window.btoa(localCamera.id)] = localCamera;
//         },
//         onRemoved: function(localCamera) {
//             delete cameras[window.btoa(localCamera.id)];
//         },
//         onSelected: function(localCamera) {
//             // Camera was selected/unselected by you or automatically
//         },
//         onStateUpdated: function(localCamera, state) {
//             // Camera state was updated
//         }
//     }).then(function() {
//         console.log("RegisterLocalCameraEventListener Success");
//     }).catch(function() {
//         console.error("RegisterLocalCameraEventListener Failed");
//     });
//
//     // Handle appearance and disappearance of microphone devices in the system
//     vidyoConnector.RegisterLocalMicrophoneEventListener({
//         onAdded: function(localMicrophone) {
//             // New microphone is available
//             microphones[window.btoa(localMicrophone.id)] = localMicrophone;
//         },
//         onRemoved: function(localMicrophone) {
//             // Existing microphone became unavailable
//             delete microphones[window.btoa(localMicrophone.id)];
//         },
//         onSelected: function(localMicrophone) {
//             // Microphone was selected/unselected by you or automatically
//         },
//         onStateUpdated: function(localMicrophone, state) {
//             // Microphone state was updated
//         }
//     }).then(function() {
//         console.log("RegisterLocalMicrophoneEventListener Success");
//     }).catch(function() {
//         console.error("RegisterLocalMicrophoneEventListener Failed");
//     });
//
//     // Handle appearance and disappearance of speaker devices in the system
//     vidyoConnector.RegisterLocalSpeakerEventListener({
//         onAdded: function(localSpeaker) {
//             // New speaker is available
//             speakers[window.btoa(localSpeaker.id)] = localSpeaker;
//         },
//         onRemoved: function(localSpeaker) {
//             // Existing speaker became unavailable
//             delete speakers[window.btoa(localSpeaker.id)];
//         },
//         onSelected: function(localSpeaker) {
//             // Speaker was selected/unselected by you or automatically
//         },
//         onStateUpdated: function(localSpeaker, state) {
//             // Speaker state was updated
//         }
//     }).then(function() {
//         console.log("RegisterLocalSpeakerEventListener Success");
//     }).catch(function() {
//         console.error("RegisterLocalSpeakerEventListener Failed");
//     });
//
//     vidyoConnector.RegisterRemoteCameraEventListener({
//         onAdded: function(camera, participant) {
//             // Store the remote camera for this participant
//             remoteCameras[participant.id] = {camera: camera, isRendered: false};
//
//             // Scan through the renderer slots and look for an open slot.
//             // If an open slot is found then assign it to the remote camera.
//             for (var i = 1; i < rendererSlots.length; i++) {
//                 if (rendererSlots[i] === OPEN_REMOTE_SLOT) {
//                     rendererSlots[i] = participant.id;
//                     remoteCameras[participant.id].isRendered = true;
//                     vidyoConnector.AssignViewToRemoteCamera({
//                         viewId: "renderer" + (i),
//                         remoteCamera: camera,
//                         displayCropped: true,
//                         allowZoom: false
//                     }).then(function(retValue) {
//                         console.log("AssignViewToRemoteCamera " + participant.id + " to slot " + i + " = " + retValue);
//                         ShowRenderer(vidyoConnector, "renderer" + (i));
//                     }).catch(function() {
//                         console.log("AssignViewToRemoteCamera Failed");
//                         rendererSlots[i] = OPEN_REMOTE_SLOT;
//                         remoteCameras[participant.id].isRendered = false;
//                     });
//                     break;
//                 }
//             }
//         },
//         onRemoved: function(camera, participant) {
//             console.log("RegisterRemoteCameraEventListener onRemoved participant.id : " + participant.id);
//             delete remoteCameras[participant.id];
//
//             // Scan through the renderer slots and if this participant's camera
//             // is being rendered in a slot, then clear the slot and hide the camera.
//             for (var i = 1; i < rendererSlots.length; i++) {
//                 if (rendererSlots[i] === participant.id) {
//                     rendererSlots[i] = OPEN_REMOTE_SLOT;
//                     console.log("Slot found, calling HideView on renderer" + i);
//                     vidyoConnector.HideView({ viewId: "renderer" + (i) }).then(function() {
//                         console.log("HideView Success");
//
//                         // If a remote camera is not rendered in a slot, replace it in the slot that was just cleaered
//                         for (var id in remoteCameras) {
//                             if (!remoteCameras[id].isRendered) {
//                                 rendererSlots[i] = id;
//                                 remoteCameras[id].isRendered = true;
//                                 vidyoConnector.AssignViewToRemoteCamera({
//                                     viewId: "renderer" + (i),
//                                     remoteCamera: remoteCameras[id].camera,
//                                     displayCropped: true,
//                                     allowZoom: false
//                                 }).then(function(retValue) {
//                                     console.log("AssignViewToRemoteCamera " + id + " to slot " + i + " = " + retValue);
//                                     ShowRenderer(vidyoConnector, "renderer" + (i));
//                                 }).catch(function() {
//                                     console.log("AssignViewToRemoteCamera Failed");
//                                     rendererSlots[i] = OPEN_REMOTE_SLOT;
//                                     remoteCameras[id].isRendered = false;
//                                 });
//                                 break;
//                             }
//                         }
//                     }).catch(function(e) {
//                         console.log("HideView Failed");
//                     });
//                     break;
//                 }
//             }
//         },
//         onStateUpdated: function(camera, participant, state) {
//             // Camera state was updated
//         }
//     }).then(function() {
//         console.log("RegisterRemoteCameraEventListener Success");
//     }).catch(function() {
//         console.error("RegisterRemoteCameraEventListener Failed");
//     });
// }
//
// // function handleDeviceChange(vidyoConnector, cameras, microphones, speakers) {
// //     //Hook up camera selector functions for each of the available cameras
// //         // Camera selected from the drop-down menu
// //
// //             vidyoConnector.HideView({ viewId: "renderer0" });
// //
// //             // Select the newly selected local camera
// //             camera = cameras[100];
// //             vidyoConnector.SelectLocalCamera({
// //                 localCamera: camera
// //             }).then(function() {
// //                 console.log("SelectCamera Success");
// //             }).catch(function() {
// //                 console.error("SelectCamera Failed");
// //             });
// //
// //
// //     //Hook up microphone selector functions for each of the available microphones
// //             microphone = microphones[100];
// //             vidyoConnector.SelectLocalMicrophone({
// //                 localMicrophone: microphone
// //             }).then(function() {
// //                 console.log("SelectMicrophone Success");
// //             }).catch(function() {
// //                 console.error("SelectMicrophone Failed");
// //             });
// //
// //
// //     //Hook up speaker selector functions for each of the available speakers
// //             speaker = speakers[100];
// //             vidyoConnector.SelectLocalSpeaker({
// //                 localSpeaker: speaker
// //             }).then(function() {
// //                 console.log("SelectSpeaker Success");
// //             }).catch(function() {
// //                 console.error("SelectSpeaker Failed");
// //             });
// // }
//
//
//
// // function getParticipantName(participant, cb) {
// //     if (!participant) {
// //         cb("Undefined");
// //         return;
// //     }
// //
// //     if (participant.name) {
// //         cb(participant.name);
// //         return;
// //     }
// //
// //     participant.GetName().then(function(name) {
// //         cb(name);
// //     }).catch(function() {
// //         cb("GetNameFailed");
// //     });
// // }
//
// function parseUrlParameters(configParams) {
//     // Fill in the form parameters from the URI
//     var host = getUrlParameterByName("host");
//     if (host)
//         $("#host").val(host);
//     var token = getUrlParameterByName("token");
//     if (token)
//         $("#token").val(token);
//     var displayName = getUrlParameterByName("displayName");
//     if (displayName)
//         $("#displayName").val(displayName);
//     var resourceId = getUrlParameterByName("resourceId");
//     if (resourceId)
//         $("#resourceId").val(resourceId);
//     configParams.autoJoin    = getUrlParameterByName("autoJoin");
//     configParams.enableDebug = getUrlParameterByName("enableDebug");
//     configParams.hideConfig  = getUrlParameterByName("hideConfig");
//
//     // If the parameters are passed in the URI, do not display options dialog,
//     // and automatically connect.
//     if (host && token && displayName && resourceId) {
//         $("#optionsParameters").addClass("optionsHidePermanent");
//     }
//
//     if (configParams.hideConfig=="1") {
//         updateRenderers(true);
//     }
//
//     return;
// }
//
// function updateRenderers(fullscreen) {
//     if (fullscreen) {
//         $("#options").addClass("optionsHide");
//         $("#renderer0").css({'position': 'absolute', 'left':  '0%', 'right': '66%', 'top': '0px', 'bottom': '54%',  'width': '34%'});
//         $("#renderer1").css({'position': 'absolute', 'left': '34%', 'right': '33%', 'top': '0px', 'bottom': '54%',  'width': '33%'});
//         $("#renderer2").css({'position': 'absolute', 'left': '67%', 'right':  '0%', 'top': '0px', 'bottom': '54%',  'width': '33%'});
//         $("#renderer3").css({'position': 'absolute', 'left':  '0%', 'right': '66%', 'top': '46%', 'bottom': '60px', 'width': '34%'});
//         $("#renderer4").css({'position': 'absolute', 'left': '34%', 'right': '33%', 'top': '46%', 'bottom': '60px', 'width': '33%'});
//         $("#renderer5").css({'position': 'absolute', 'left': '67%', 'right':  '0%', 'top': '46%', 'bottom': '60px', 'width': '33%'});
//     } else {
//         $("#options").removeClass("optionsHide");
//         $("#renderer0").css({'position': 'absolute', 'left': '25%', 'right': '0%', 'top': '0px', 'bottom': '60px',  'width': '75%'});
//         $("#renderer1").css({'position': 'absolute', 'width': '0px'});
//         $("#renderer2").css({'position': 'absolute', 'width': '0px'});
//         $("#renderer3").css({'position': 'absolute', 'width': '0px'});
//         $("#renderer4").css({'position': 'absolute', 'width': '0px'});
//         $("#renderer5").css({'position': 'absolute', 'width': '0px'});
//     }
//
//     showRenderers();
// }
//
// function connectToConference() {
//     vidyoConnector.Connect({
//         // Take input from options form
//         host: "prod.vidyo.io",
//         token: "cHJvdmlzaW9uAGNhdHVyQGE3NTk2Yy52aWR5by5pbwA2MzY4MzQyMjYzOQAAZjliNDIyOTY5Nzg0MDFlNmYxMTYyMzY0NDQ0YTFkNjIwMDM0Njc2ZGI2ZjhjMTNhMzE1ZTdmZDFhYTI4MDVlNzU4NmJkZjhjMTUyMzZlZGU3MjQ5ZWVjZmE5OTViZWNm",
//         displayName: "catur",
//         resourceId: "demoRoom",
//
//         // Define handlers for connection events.
//         onSuccess: function() {
//             // Connected
//             console.log("vidyoConnector.Connect : onSuccess callback received");
//         },
//         onFailure: function(reason) {
//             // Failed
//             console.error("vidyoConnector.Connect : onFailure callback received" + reason);
//         },
//         onDisconnected: function(reason) {
//             // Disconnected
//             console.log("vidyoConnector.Connect : onDisconnected callback received");
//         }
//     }).then(function(status) {
//         if (status) {
//             console.log("Connect Success");
//         } else {
//             console.error("Connect Failed");
//         }
//     }).catch(function() {
//         console.error("Connect Failed");
//     });
// }
//
// function getUrlParameterByName(name) {
//     var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
//     return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
// }
//
// // function joinCall(){
// //     // To join a video conference call Connect method
// //     vidyoConnector.Connect({
// //         host:"prod.vidyo.io",  // Server name, for most production apps it will be prod.vidyo.io
// //         token:"cHJvdmlzaW9uAGNhdHVyQGE3NTk2Yy52aWR5by5pbwA2MzY3MzM5OTIyMAAAM2I0YjUwOWFiNDQ5Zjg3NjBmMDQwYjhmY2QxNjIwNmFjNWE5MmRlNTgzNDZmNzZiNDdkOGVmMDAyMTA0MzJiZGYwMDM3M2FjM2QxZjZiNmZiM2Q5MDUzMjM5MDBkMDky",          // Add generated token (https://developer.vidyo.io/documentation/4-1-16-8/getting-started#Tokens)
// //         displayName:"catur",  // Display name
// //         resourceId:"demoRoom", // Room name
// //         onSuccess: function(){
// //             console.log("Connected!! YAY!");
// //         },
// //         onFailure: function(reason){
// //             console.error("Connection failed");
// //         },
// //         onDisconnected: function(reason) {
// //             console.log(" disconnected - " + reason);
// //         }
// //     })
// // }

