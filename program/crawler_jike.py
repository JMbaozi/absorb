import requests
import lxml
from bs4 import BeautifulSoup

url = 'https://web.okjike.com/search?keyword=包子丶'

def getHtml():
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.40 Safari/537.36 Edg/87.0.664.24',
        'referer': 'https://web.okjike.com/',
        'cookie': '_ga=GA1.2.371043276.1600434408; sid=070b13c0-d4dd-4cbc-ac15-12581cb4482f; _gid=GA1.2.506329486.1604892407; x-jike-access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiR2E0UHlwd1YxYWhrU2R5eEVFSkg0WHRNaWVxRFQ1RU1PUHhxNUpmY0QxTVk5d1RJc0VJUFNoN29KTmxVSnNcL3FNSWdIYUZTZ2piblJaU0FsWlVTQmZsMEU5bWdTYmk1aDBDUnhDVTZFVjJrTFwvaHVBdDdKSnZBQVQ4VllOZDlGVDdTTU1XT2M2TWFhS2ZNUDhhWGRxZmc0WWYrN1oyK0VYVzB4Zndlc3puZGtnVXZ4Nkd6UkhpazNRNkNwUW1HdjVtXC9ZT1lDZGpoTmFIOEI4bVpcL3ZFdkdaeVZmXC9KTmJPK0NicEN2cFc3ekNnTnd4XC9JcnhBWHdNRUJxaGxQSVBcL3ZxdTN3OGo1Qlk3ODJiaEMxdWNDTkxEZUNLbURRUVpIYXUralNodWt3VDNMM1VNT0hvbzhoQ1JYS1wvbGo1ZnVWSmZtWGp5SUZTMjJzR2NLd1wvRlFEK1VnPT0iLCJ2IjozLCJpdiI6Ik5xa1wvRHRCcGVuRGJFQWU3OW1NXC91QT09IiwiaWF0IjoxNjA0ODkyNDA2LjY3N30.YjMudEWBhggmuBaQFXbJ3r_Sk-L_dUMP-S9n6kZhRTM; x-jike-refresh-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiQjBXd1k4cW9UVjRTMHpuc0xBQm4rd2lPMFZlWGgrVk42bFplZFFxNGgwM3c1a0ZacXc0aGU5UHRNZTExenNZQXk3V2hmUHk4TjlnNHo3NDlLek0yUk5mdHhlWVNTUXFySHA1MmRkek9SNDNaT3JoRTUzVk4xNk0xVnBCSThmR3p0bGttMm9cL093MGVjZlhLbmIyTnNlSlNabHh5M1NabEQ1emxoeDZjY20wZz0iLCJ2IjozLCJpdiI6IlVCZE5WQUlnSHhHWUZmdkdkSHMxbXc9PSIsImlhdCI6MTYwNDg5MjQwNi42Nzd9.fKI9FMOwObsMMN6aAv75N73Dxzxo5Yc0xMImeV-5TXc'
    }
    r = requests.get(url,headers=headers)
    print(r)
