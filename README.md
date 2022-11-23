# webhooks
simple webhook that trigger bash script


example with parameters
    http://localhost:8989/webhooks/bitbucket/web-game_lobby
        ?script=/home/ced/workspaces/web-game_lobby/build-dev.sh
        &callback_success=http://localhost:8989/notify?text=branch $branch name $name message $message
        &callback_failed=http://localhost:8989/notify?error=$error
        &callback_log=http://localhost:8989/notify?log=$log


payloads
    callback_success - 
        {name, branch, message}

    callback_failed -
        {error}

    callback_log - 
        {log}