package <%= packageName %>;

import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Handler {
    private static Logger LOG = LoggerFactory.getLogger(Handler.class);

    public Handler() { }

    public APIGatewayV2HTTPResponse handleRequest(APIGatewayV2HTTPEvent event) {
      LOG.info("Input: {}", event);

      APIGatewayV2HTTPResponse response;
        try {
            response = createResponse(200);
        } catch (Exception ex) {
            LOG.error("Exception: {}", ex.getMessage(), ex);
            response = createResponse(500);
        }

        return response;
    }

    private APIGatewayV2HTTPResponse createResponse(int statusCode)  {
        return APIGatewayV2HTTPResponse.builder()
                .withStatusCode(statusCode)
                .build();
    }
}
