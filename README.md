
# simple-webhook

A simple webhook that will trigger a bash script, log, and notify when success or failed.


## Authors

- [@spadefaith](https://www.github.com/spadefaith)


## API Reference

#### webhook endpoint

```http
  POST /webhhooks/:type/:repo
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `script` | `string` | **Required**. path to bash script |
| `callback_success` | `string` | **Required**. callback url when success |
| `callback_failed` | `string` | **Required**. callback url when failed |
| `callback_log` | `string` | **Required**. callback url for log |




```http
  GET /callback__success
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | username of who committed |
| `message` | `string` | commit message |
| `branch` | `string` | branch commited |



```http
  GET /callback__failed
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `error` | `string` | error message |


```http
  GET /callback_log
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `text` | `string` | output of "echo" |

## Documentation

In order to add the parameters in the callback url,
add "$" before the parameter name, it will be replaced by the correct value.


example callback_log -
http://localhost:8989/notify?log=$text


example callback_failed -
http://localhost:8989/notify?error=$error


example callback_success -
http://localhost:8989/notify?text=$branch_$name_$message




