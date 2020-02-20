package com.datapath.releasesintegration.domain;

import lombok.Data;

import java.util.Collections;
import java.util.List;


@Data
public class ProcedureResponseEntity {
    private String id;
    private String ocid;
    private String date;
    private String source;

    private Tender tender;
    private Bids bids;
    private List<Party> parties;
    private List<Contract> contracts;
    private List<Award> awards;
    private List<RelatedProcess> relatedProcesses;

    public ProcedureResponseEntity() {
        awards = Collections.emptyList();
        contracts = Collections.emptyList();
        relatedProcesses = Collections.emptyList();
    }

    @Data
    public static class RelatedProcess {
        String id;
        String scheme;
        String identifier;
        List<String> relationship;
    }

    @Data
    public static class Bids {
        List<Detail> details;
    }

    @Data
    public static class Party {
        private String id;
        private String name;
        private Address address;
        private Details details;
        private Identifier identifier;
        private ContactPoint contactPoint;

        @Data
        public static class Details {
            private String scale;
            private String department;
        }
    }


    @Data
    public static class Award {
        private String id;
        private String status;
        private String date;

        private Period contractPeriod;

        private List<Item> items;
        private List<Supplier> winners;

    }

    @Data
    public static class Tender {
        private String id;
        private String funds;
        private String title;
        private String status;
        private String holder;
        private String industry;
        private String description;
        private String datePublished;
        private String procurementMethod;
        private String procurementMethodDetails;

        private Long numberOfUnpaidBids;
        private Long numberOfRevokedBids;

        private Value value;
        private TenderPeriod tenderPeriod;
        private ProcuringEntity procuringEntity;
        private ParticipationFees participationFees;

        private List<Lot> lots;
        private List<Item> items;
        private List<Document> documents;
        private List<Enquiry> enquiries;

        private Tender() {
            this.lots = Collections.emptyList();
            this.items = Collections.emptyList();
            this.documents = Collections.emptyList();
            this.enquiries = Collections.emptyList();
        }

    }

    @Data
    public static class Contract {
        private String id;
        private String title;
        private String funds;
        private String status;
        private String dateSigned;
        private String dateCreated;
        private String description;

        private Value value;
        private Period period;
        private List<Item> items;
        private List<Supplier> suppliers;
        private ProcuringEntity buyer;
    }


    @Data
    public static class Detail {
        private String id;
        private String date;
        private String status;
        private String relatedLot;

        private Value value;
        private Period period;

        private List<Document> documents;
        private List<Supplier> tenderers;
    }


    @Data
    public static class Item {
        private String id;
        private String quantity;
        private String relatedLot;
        private String positionType;
        private String countryOfOrigin;

        private Unit unit;
        private Value value;
        private Classification classification;
    }

    @Data
    public static class Lot {
        private String id;
        private String status;
        private Boolean forSmallScaleBusiness;

        private Value value;
        private Period deliveryPeriod;

        private List<Guarantee> guarantees;

        private Lot() {
            this.guarantees = Collections.emptyList();
        }

    }

    @Data
    public static class Classification {
        private String id;
        private String scheme;
        private String description;

    }

    @Data
    public static class Document {
        private String id;
        private String title;
        private String description;
        private String documentType;
        private String url;
        private String datePublished;
        private String format;
        private String author;
    }

    @Data
    public static class Enquiry {
        private String id;
        private String date;
        private String answer;
        private String description;
        private String dateAnswered;
    }

    @Data
    public static class Guarantee {
        private String type;
        private Value value;

    }

    @Data
    public static class ParticipationFees {
        private String type;
        private Value value;
    }

    @Data
    public static class Period {
        private String endDate;
        private String startDate;
    }

    @Data
    public static class ProcuringEntity {
        private String id;
        private String name;
    }

    @Data
    public static class Supplier {
        private String id;
        private String name;
    }

    @Data
    public static class TenderPeriod {
        private String endDate;
        private String startDate;
    }

    @Data
    public static class Unit {
        private String id;
        private String name;
        private String scheme;
        private Value value;
    }

    @Data
    public static class Value {
        private String amount;
        private String currency;
    }

    @Data
    public static class Identifier {
        private String id;
        private String legalName;
        private String scheme;
    }

    @Data
    public static class Address {
        private String countryName;
        private String locality;
        private String postalCode;
        private String region;
        private String streetAddress;
    }

    @Data
    public static class ContactPoint {
        private String email;
        private String faxNumber;
        private String name;
        private String telephone;
        private String url;
    }

}
