# PresentVideoStimulus_LVNP
This repo contains the application to display video clips at extremely consistent rates. The core code is the skeleton for all video stimulus presented at the Laboratory for Visual Neuroplasticity, but it is explicitly written for the virtual corridor/hallway fMRI experiment conducted between June 2019 to the present (as of this writing). To change the protocol, you only need to change the clips and the sequences (see Emma's Lab Log for details). 

**All code and files in the repository are the sole property of LVNP and may _not_ be used or distributed without explicit permission from the laboratory director.**

## Background
This app was the third attempt by the LVNP to present video footage at a consistent frame rate. It was written because we found that despite video clips being exactly the same length, frame rate, and approximate memory size, they would play at widely differing rates. As these clips were the stimulus for functional magentic resounance imaging, fluctuations of more than a few microseconds could render the final analysis completely moot. The first two iteratons were generally sucessful, but this final one proved to be the simplest and stablest method. 

The first iteration was built with only Python 3.6, so python was doing all of the computations. This meant that the videos were presented as literal images. The videos were initially tuned for the python video player to present them as expected, but later, when we decided to re-work the protocol (hence "VCHallway*2*") and include new clips, we found that those settings were extremely difficult replicate and the finicky nature of the tuning was not sustainable. This led to a complete revamping of the system. The second implementation was pure HTML/javascript, which worked well, but the not-so-technically-minded researchers found it difficult to maintain the necessary filesystem, casting doubt on the portability of the code. Given that the scanner is off-site and an increasing tendency for our laptops to fail to connect to the technology at the scanning center, portability became a higher prority than initially assumed. As such, we developed the third iteration, this code. By combining Python (specifically Flask) and Javascript, we were able to reach a happy medium of stability, flexibilty, and portability.

It is built with Python 3.6 using a Flask framework. The majority of the web actions are written in Javascript for ease and speed. The videos are hosted  on the local computer server managed by Flask and are pre-loaded into an HTML5 video playlist. The pre-loading decreases the period between clips to negligible amounts and using the HTML5 player means fullscreen demenisions do not have to be computed by the experimenter, which decreases likilhood of image distortion. While the script runs in a web-browser, it is completely self-contained. It is designed with the "VCHallway2" protocol in mind, but it was built with the idea of flexibility, so only minor modifications to the core html file (mostly just clip names) are necessary moving forward.

## Specifications:
The following were either required or requested by the researchers prior to the final construction. They form the backbone of the key features.

1.  Video presentation with no more than .10 seconds of timing fluctations (**CRITICAL**) 
  -> Anything more than that renders the timing for the final analysis useless! We must be able to know the onset and duration of each clip  
2. Record the *exact* timecode for the start and end of the clip. (**CRITICAL**)

3. Start the video sequence at the ' (quotation mark) key press (**CRITICAL**) 
  -> The MRI scanner will always send a " ' " symbol when it is ready to begin a sequence. Note: The scanner sends the symbol every ten seconds after the first, so the script must also be able to ignore any subsequent signal
 
4. Be able to record any button press during the stimulus (except for the quotation mark).
 -> This is important for the cases when the participant needs to respond to certian stimuli 

5. Be able to quit the presentation at any point
  -> With either the ESC button *or* the q key (dealer's choice)

6. Download a csv file with the onset, duration, response, and clipname. 
 -> Preferably automatically, just to be safe
 -> Make sure the file can't be overwritten (**CRITICAL**)

7. Be able to present at least two different sequences of clips (to be determined *ad-hoc* and statically coded) 

8. Be excessible even without internet access (**CRITICAL**) 

Besides the requirements listed above, the csv file from the trial must be easily paired with the fMRI aquisition. There is an established protocol on the information that must is stored. To stay consistent, all of the participant's relevant information (e.g. group type (Control, OVI, CVI), DOB, scan date, etc) had to be gathered at the start of the study. This is the purpose of the splash-screen form. Importantly, the subject's codename is automatically generated and can only be explicitly overwritten*.

*This was a feature added after the pilot data collection when the researchers realized that not everyone was comfortable with the naming convention. 

## Running the experiment
1. Go to the Desktop and look for the file called "fmri_hallway". If you find it, skip to step 5. 
 2. Open the terminal*
 3. Navigate to the Desktop.
 4. Type in the following:
    [FOR UNIX]
    ```console
    COMPUTER@USER:~/Desktop $ python3 -m venv fmri_hallway
    COMPUTER@USER:~/Desktop $ cd fmri_hallway
    COMPUTER@USER:~/Desktop/fmri_hallway $ source bin/activate
    ```
    [FOR WINDOWS]
    ```console
    COMPUTER@USER:\Desktop $ virtualenv fmri_hallway
    COMPUTER@USER:\Desktop $ cd fmri_hallway
    COMPUTER@USER:\Desktop\fmri_hallway $ Scripts\activate
    ```
    [FOR BOTH]
    ```console
    COMPUTER@USER:~/Desktop/fmri_hallway $ mkdir app
    COMPUTER@USER:~/Desktop/fmri_hallway/ $ cd app
    (fmri_hallway) COMPUTER@USER:~/Desktop/fmri_hallway/app $ git clone https://github.com/ebailin/PresentVideoStimulus_LVNP.git
    (fmri_hallway) COMPUTER@USER:~/Desktop/fmri_hallway/app $ pip install -r requirements.txt  
    ```
 5. If you did step 4, skip this step.
 
    ```console
    COMPUTER@USER:~/Desktop $ cd fmri_hallway
    COMPUTER@USER:~/Desktop/fmri_hallway $ source bin/activate #for UNIX, Scripts\activate for Windows
    (fmri_hallway) COMPUTER@USER:~/Desktop/fmri_hallway/ $ cd app
    ```

6. Start the flask app: 

     ```console
     (fmri_hallway) COMPUTER@USER:~/Desktop/fmri_hallway/app $ flask
        [2019-11-02 16:07:49,995] INFO in __init__: startup
        hallway is running
        Serving on http://DESKTOP-KGTPVBU:8080
        Serving on http://DESKTOP-KGTPVBU:8080
     ```

7. Open a new window on Chrome (**not** Safari or Firefox. Neither will play the videos accurately!) and go to [http://localhost:8080/].
 
8. Test that the videos play correctly by selecting "yes" to "Is this a test? ". **If the fields do not autopopulate and you cannot select "Test" in the dropdown menu, you need to switch to Chrome**. Hit "Go". When the window with a freeze-frame video loads, hit the quotation key (the one next to the right shift button). The picture should go into fullscreen and then four videos should play in sequence. Try hitting any key *except* for ESC. When the fourth video ends, the screen should go out of fullscreen and an file should automatically download called "TEST_0000_DATETIMEOFRUN.Timings.csv". Open that file and confirm that the duration of each clip is no more than .10 seconds from the expected duration (for the current VCHallway protocol, it should be 8.00 seconds). If you hit any key during any clip, confirm that there is a time in the "response" column for that clip. 

9. If all things go as planned, hit the back button on the browser to return to the form. If something has not worked, do not try to debug unless you're sure you know what you're doing! If you're at all unsure, contact Emma. If you can't find/reach Emma, go to Chris. If you don't have a clue who those people are, find someone else who knows how to debug. No matter what, *make a copy of the whole folder and edit that, **NOT** the original, _even_ if you're using git! Follow current lab procedures on replacing scripts if you solve the problem.*

10. Fill in the relevant subject information on the form. The "Subject Initials" field should autopopulate as you fill in the top boxes. If it doesn't, or for some reason the code is incorrect, hit the "edit" button to unlock the field and correct it. The "Scan Date" should be the current date. If you have a very good reason to change this, unlock the field using the edit button.

11. In the "Runs" section, the "Number" field should be the number of times the subject has seen the stimulus *in this session*/the number of fMRI aquisitions begun (regardless of whether they finished). The "Version" is the sequence to be presented. For every LVNP fMRI protocol as of the writing of this script, we alternate A,B,A,B... in that order. Confirm with the lead investigator that this is still the protocol. Hit "Go".

12. As with the test, the page should now be a video player. It should go fullscreen at the signal from the scanner. At the end of the sequence, the video will exit fullscreen and the csv should download. It should be named with the subject's code, the date, and the run number. Open it to confirm the responses and video durations. Hit the back key to return to the form. 

13. If you hit the back key, the subject information section should still be filled out and the Number should have incremented (though the number incrementing seems to have a random bug?--esb, Aug8,2019). Change what needs to be changed and hit go again. Repeat step 12 as needed.

14. At the end of the scanning session, copy all of the csvs onto the lab flashdrive. Be sure that the MRI technician has also copied all of the scans to the drive. Return to the lab and process according to the procedures documented in Emma's Lab Log. 


