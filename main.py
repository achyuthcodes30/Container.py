import os
import subprocess
import sys
import ctypes

def run():
    command = sys.argv[2:]
    print(f"Running {command}")
    script_path = os.path.abspath(sys.argv[0])
    command = ["sudo","unshare","--pid","--uts","--mount","--fork",sys.executable,script_path, "child"] + sys.argv[2:]
    
    try:
     child_process = subprocess.run(command , stdin=sys.stdin, stdout=sys.stdout, stderr=sys.stderr,check = True)
    except OSError as e:
        print(f"Error {e}")


def child():
    try:
     ctypes.CDLL('libc.so.6').sethostname(b"container", 9)
  
     os.chdir("/")
     command =  sys.argv[2:]
     
     subprocess.run(["mount","-t","proc","proc","/proc"], check = True)
     
     subprocess.run(command, stdin=sys.stdin, stdout=sys.stdout, stderr=sys.stderr, check = True)
     subprocess.run(["umount", "/proc"], check=True)
    except OSError as e:
        print(f"Error {e}")
        
        
if sys.argv[1] == "run":
        run()
elif sys.argv[1] == "child":
        child()
else:
        print("Error: Invalid command")
        

