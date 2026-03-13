import { CommandDetail } from './types';

export const categories = [
  { id: 'all', name: '全部 (All)', icon: 'Terminal' },
  { id: 'file', name: '檔案系統 (File System)', icon: 'FileText' },
  { id: 'text', name: '文字處理 (Text Processing)', icon: 'Book' },
  { id: 'system', name: '系統管理 (System)', icon: 'Cpu' },
  { id: 'network', name: '網路 (Network)', icon: 'Network' },
  { id: 'permission', name: '權限 (Permissions)', icon: 'Shield' },
];

export const localCommands: CommandDetail[] = [
  {
    name: 'ls',
    category: 'file',
    description: '列出目錄內容 (List directory contents)',
    syntax: 'ls [選項] [檔案或目錄]',
    options: [
      { flag: '-l', description: '使用長格式列出詳細資訊 (權限、擁有者、大小、時間)' },
      { flag: '-a', description: '列出所有檔案，包括隱藏檔 (以 . 開頭的檔案)' },
      { flag: '-h', description: '以人類可讀的格式顯示檔案大小 (例如 1K, 234M, 2G)' }
    ],
    examples: [
      { code: 'ls -lah', description: '列出當前目錄下所有檔案的詳細資訊，並以易讀格式顯示大小' },
      { code: 'ls /var/log', description: '列出 /var/log 目錄的內容' }
    ]
  },
  {
    name: 'cd',
    category: 'file',
    description: '切換當前工作目錄 (Change directory)',
    syntax: 'cd [目錄路徑]',
    options: [],
    examples: [
      { code: 'cd /var/log', description: '切換到 /var/log 目錄' },
      { code: 'cd ..', description: '回到上一層目錄' },
      { code: 'cd ~', description: '回到使用者的家目錄' },
      { code: 'cd -', description: '回到上一次所在的目錄' }
    ]
  },
  {
    name: 'mkdir',
    category: 'file',
    description: '建立新目錄 (Make directories)',
    syntax: 'mkdir [選項] 目錄名稱',
    options: [
      { flag: '-p', description: '建立多層級目錄，若父目錄不存在則一併建立 (Parents)' }
    ],
    examples: [
      { code: 'mkdir new_folder', description: '在當前目錄建立名為 new_folder 的目錄' },
      { code: 'mkdir -p /tmp/test/data', description: '建立多層級目錄，包含 test 與 data' }
    ]
  },
  {
    name: 'rm',
    category: 'file',
    description: '刪除檔案或目錄 (Remove files or directories)',
    syntax: 'rm [選項] 檔案或目錄',
    options: [
      { flag: '-r', description: '遞迴刪除目錄及其內容 (Recursive)' },
      { flag: '-f', description: '強制刪除，不顯示確認提示 (Force)' },
      { flag: '-i', description: '刪除前逐一詢問確認 (Interactive)' }
    ],
    examples: [
      { code: 'rm file.txt', description: '刪除 file.txt 檔案' },
      { code: 'rm -rf old_project/', description: '強制且遞迴刪除 old_project 目錄 (危險操作請小心)' }
    ]
  },
  {
    name: 'cp',
    category: 'file',
    description: '複製檔案或目錄 (Copy files and directories)',
    syntax: 'cp [選項] 來源 目的地',
    options: [
      { flag: '-r', description: '遞迴複製目錄及其內容 (Recursive)' },
      { flag: '-i', description: '若目的地檔案已存在，覆蓋前先詢問 (Interactive)' }
    ],
    examples: [
      { code: 'cp file.txt backup.txt', description: '將 file.txt 複製為 backup.txt' },
      { code: 'cp -r src/ dest/', description: '將 src 目錄完整複製到 dest 目錄下' }
    ]
  },
  {
    name: 'mv',
    category: 'file',
    description: '移動或重新命名檔案與目錄 (Move or rename files)',
    syntax: 'mv [選項] 來源 目的地',
    options: [
      { flag: '-i', description: '若目的地檔案已存在，覆蓋前先詢問 (Interactive)' }
    ],
    examples: [
      { code: 'mv old_name.txt new_name.txt', description: '將檔案重新命名' },
      { code: 'mv file.txt /tmp/', description: '將檔案移動到 /tmp 目錄' }
    ]
  },
  {
    name: 'cat',
    category: 'text',
    description: '連接檔案並印出到標準輸出 (Concatenate files and print)',
    syntax: 'cat [選項] [檔案]',
    options: [
      { flag: '-n', description: '顯示行號 (Number all output lines)' }
    ],
    examples: [
      { code: 'cat /etc/os-release', description: '查看系統版本資訊' },
      { code: 'cat file1.txt file2.txt > merged.txt', description: '將兩個檔案合併成一個新檔案' }
    ]
  },
  {
    name: 'tail',
    category: 'text',
    description: '輸出檔案的最後幾行 (Output the last part of files)',
    syntax: 'tail [選項] [檔案]',
    options: [
      { flag: '-n', description: '指定顯示的行數 (例如 -n 20)' },
      { flag: '-f', description: '持續追蹤檔案新增的內容 (Follow)' }
    ],
    examples: [
      { code: 'tail -n 50 /var/log/syslog', description: '查看系統日誌的最後 50 行' },
      { code: 'tail -f /var/log/nginx/access.log', description: '即時監控 Nginx 的存取日誌' }
    ]
  },
  {
    name: 'grep',
    category: 'text',
    description: '搜尋符合模式的字串 (Print lines matching a pattern)',
    syntax: 'grep [選項] "搜尋字串" [檔案]',
    options: [
      { flag: '-i', description: '忽略大小寫 (Ignore case)' },
      { flag: '-r', description: '遞迴搜尋目錄下的所有檔案 (Recursive)' },
      { flag: '-v', description: '反向選取，顯示不包含搜尋字串的行 (Invert match)' },
      { flag: '-n', description: '顯示行號 (Line number)' }
    ],
    examples: [
      { code: 'grep -i "error" /var/log/syslog', description: '在 syslog 中不分大小寫搜尋 "error"' },
      { code: 'grep -rn "TODO" ./src', description: '在 src 目錄下遞迴搜尋 "TODO" 並顯示行號' }
    ]
  },
  {
    name: 'find',
    category: 'file',
    description: '在目錄中搜尋檔案 (Search for files in a directory hierarchy)',
    syntax: 'find [路徑] [條件] [動作]',
    options: [
      { flag: '-name', description: '依檔案名稱搜尋 (支援萬用字元)' },
      { flag: '-type', description: '依檔案類型搜尋 (f: 檔案, d: 目錄)' },
      { flag: '-size', description: '依檔案大小搜尋 (例如 +100M)' },
      { flag: '-mtime', description: '依修改時間搜尋 (例如 -7 表示 7 天內)' }
    ],
    examples: [
      { code: 'find . -name "*.txt"', description: '在當前目錄及子目錄下尋找所有 .txt 檔案' },
      { code: 'find /var/log -type f -size +50M', description: '尋找 /var/log 下大於 50MB 的檔案' }
    ]
  },
  {
    name: 'tar',
    category: 'file',
    description: '打包與壓縮工具 (Tape archive utility)',
    syntax: 'tar [選項] [檔案名稱] [要打包的檔案或目錄]',
    options: [
      { flag: '-c', description: '建立新的壓縮檔 (Create)' },
      { flag: '-x', description: '解壓縮檔案 (Extract)' },
      { flag: '-z', description: '透過 gzip 壓縮/解壓縮 (.tar.gz)' },
      { flag: '-v', description: '顯示處理過程 (Verbose)' },
      { flag: '-f', description: '指定檔案名稱 (File)' }
    ],
    examples: [
      { code: 'tar -czvf archive.tar.gz /path/to/dir', description: '將目錄打包並使用 gzip 壓縮' },
      { code: 'tar -xzvf archive.tar.gz', description: '解壓縮 .tar.gz 檔案' }
    ]
  },
  {
    name: 'chmod',
    category: 'permission',
    description: '更改檔案或目錄權限 (Change file mode bits)',
    syntax: 'chmod [選項] 權限 檔案',
    options: [
      { flag: '-R', description: '遞迴更改目錄及其內容的權限 (Recursive)' },
      { flag: '+x', description: '加入執行權限' }
    ],
    examples: [
      { code: 'chmod +x script.sh', description: '給予 script.sh 執行權限' },
      { code: 'chmod 755 /var/www/html', description: '設定目錄權限為 755 (擁有者可讀寫執行，其他人可讀執行)' },
      { code: 'chmod -R 644 ./docs', description: '遞迴將 docs 目錄下的檔案權限設為 644' }
    ]
  },
  {
    name: 'chown',
    category: 'permission',
    description: '更改檔案擁有者與群組 (Change file owner and group)',
    syntax: 'chown [選項] 擁有者:群組 檔案',
    options: [
      { flag: '-R', description: '遞迴更改目錄及其內容的擁有者 (Recursive)' }
    ],
    examples: [
      { code: 'chown nginx:nginx /var/www/html', description: '將目錄的擁有者與群組更改為 nginx' },
      { code: 'chown -R user1:developers ./project', description: '遞迴更改專案目錄的擁有者與群組' }
    ]
  },
  {
    name: 'sudo',
    category: 'permission',
    description: '以其他使用者（通常是 root）身分執行指令 (Execute a command as another user)',
    syntax: 'sudo [選項] 指令',
    options: [
      { flag: '-u', description: '指定要切換的使用者 (預設為 root)' },
      { flag: '-i', description: '模擬初始登入環境 (Login shell)' }
    ],
    examples: [
      { code: 'sudo apt update', description: '以 root 權限更新軟體包列表' },
      { code: 'sudo -u postgres psql', description: '以 postgres 使用者身分執行 psql' }
    ]
  },
  {
    name: 'ps',
    category: 'system',
    description: '顯示當前行程狀態 (Report a snapshot of the current processes)',
    syntax: 'ps [選項]',
    options: [
      { flag: 'aux', description: '顯示系統上所有的行程詳細資訊' },
      { flag: '-ef', description: '以標準格式顯示所有行程' }
    ],
    examples: [
      { code: 'ps aux | grep node', description: '尋找所有與 node 相關的行程' }
    ]
  },
  {
    name: 'top',
    category: 'system',
    description: '即時顯示系統行程與資源使用狀況 (Display Linux processes)',
    syntax: 'top',
    options: [
      { flag: '-u', description: '只顯示特定使用者的行程' },
      { flag: '-d', description: '指定更新延遲時間 (秒)' }
    ],
    examples: [
      { code: 'top -u root', description: '只顯示 root 使用者的行程' }
    ]
  },
  {
    name: 'df',
    category: 'system',
    description: '顯示檔案系統的磁碟空間使用量 (Report file system disk space usage)',
    syntax: 'df [選項]',
    options: [
      { flag: '-h', description: '以人類可讀的格式顯示 (Human-readable)' },
      { flag: '-T', description: '顯示檔案系統類型' }
    ],
    examples: [
      { code: 'df -h', description: '查看各個掛載點的磁碟剩餘空間' }
    ]
  },
  {
    name: 'du',
    category: 'system',
    description: '估算檔案或目錄的空間使用量 (Estimate file space usage)',
    syntax: 'du [選項] [目錄或檔案]',
    options: [
      { flag: '-h', description: '以人類可讀的格式顯示 (Human-readable)' },
      { flag: '-s', description: '只顯示總計大小 (Summarize)' },
      { flag: '-d', description: '指定檢查的目錄深度 (Max depth)' }
    ],
    examples: [
      { code: 'du -sh /var/log', description: '查看 /var/log 目錄的總大小' },
      { code: 'du -h -d 1 /var', description: '查看 /var 目錄下第一層子目錄的大小' }
    ]
  },
  {
    name: 'free',
    category: 'system',
    description: '顯示系統記憶體使用量 (Display amount of free and used memory)',
    syntax: 'free [選項]',
    options: [
      { flag: '-h', description: '以人類可讀的格式顯示 (Human-readable)' },
      { flag: '-m', description: '以 MB 為單位顯示' }
    ],
    examples: [
      { code: 'free -h', description: '查看系統目前的 RAM 與 Swap 使用狀況' }
    ]
  },
  {
    name: 'curl',
    category: 'network',
    description: '透過 URL 傳輸資料的命令列工具 (Transfer a URL)',
    syntax: 'curl [選項] [URL]',
    options: [
      { flag: '-O', description: '將下載內容儲存為遠端檔案的名稱' },
      { flag: '-I', description: '只獲取 HTTP 標頭資訊 (Header)' },
      { flag: '-X', description: '指定 HTTP 請求方法 (例如 GET, POST)' },
      { flag: '-d', description: '傳送 HTTP POST 資料' }
    ],
    examples: [
      { code: 'curl -O https://example.com/file.zip', description: '下載檔案' },
      { code: 'curl -I https://google.com', description: '查看網站的 HTTP 標頭' },
      { code: 'curl -X POST -d "name=test" https://api.example.com/data', description: '發送 POST 請求' }
    ]
  },
  {
    name: 'ping',
    category: 'network',
    description: '測試與目標主機的連線狀態 (Send ICMP ECHO_REQUEST to network hosts)',
    syntax: 'ping [選項] 目標主機',
    options: [
      { flag: '-c', description: '指定發送封包的次數 (Count)' },
      { flag: '-i', description: '指定發送封包的間隔秒數 (Interval)' }
    ],
    examples: [
      { code: 'ping -c 4 google.com', description: '向 google.com 發送 4 個測試封包' }
    ]
  },
  {
    name: 'ssh',
    category: 'network',
    description: '安全外殼協定遠端登入 (OpenSSH SSH client)',
    syntax: 'ssh [選項] 使用者@主機',
    options: [
      { flag: '-p', description: '指定連接的 Port 號 (預設為 22)' },
      { flag: '-i', description: '指定用於身分驗證的私鑰檔案 (Identity file)' }
    ],
    examples: [
      { code: 'ssh root@192.168.1.100', description: '以 root 身分登入遠端伺服器' },
      { code: 'ssh -i ~/.ssh/id_rsa user@example.com', description: '使用指定的私鑰登入' }
    ]
  },
  {
    name: 'awk',
    category: 'text',
    description: '強大的文字處理與分析工具 (Pattern scanning and processing language)',
    syntax: "awk '[程式碼]' [檔案]",
    options: [
      { flag: '-F', description: '指定欄位分隔符號 (預設為空白)' }
    ],
    examples: [
      { code: "awk -F: '{print $1}' /etc/passwd", description: '列出系統上所有的使用者名稱 (以 : 分隔，印出第一欄)' },
      { code: "ps aux | awk '{print $2, $11}'", description: '印出所有行程的 PID 與指令名稱' }
    ]
  },
  {
    name: 'sed',
    category: 'text',
    description: '串流文字編輯器，用於過濾與轉換文字 (Stream editor)',
    syntax: "sed [選項] '指令' [檔案]",
    options: [
      { flag: '-i', description: '直接修改檔案內容 (In-place edit)' },
      { flag: '-e', description: '允許執行多個指令' }
    ],
    examples: [
      { code: "sed -i 's/old/new/g' file.txt", description: '將檔案中所有的 "old" 替換為 "new"' },
      { code: "sed '2,5d' file.txt", description: '刪除檔案的第 2 到第 5 行並輸出結果' }
    ]
  }
];
